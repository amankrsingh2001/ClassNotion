const { getRazorpay } = require('../config/Razorpay')
const { prisma } = require('../config/database')
const { mailSender } = require('../utils/mailSender')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
const { paymentSuccessEmail } = require('../mail/paymentSuccessEmail')
const { handle, fail, userId } = require('../utils/http')
const crypto = require('node:crypto')

function courseIds(value) {
    if (!Array.isArray(value)) return []
    const ids = value.flat(1)
    return ids.every(id => typeof id === 'string' && id) ? [...new Set(ids)] : []
}
const capturePayment = handle(async (req, res) => {
    const ids = courseIds(req.body.courses)
    if (!ids.length) return fail(res, 400, 'Please provide course IDs')
    const courses = await prisma.course.findMany({ where: { id: { in: ids }, status: 'Published' }, include: { enrollments: { where: { userId: userId(req) } } } })
    if (courses.length !== ids.length) return fail(res, 404, 'Course not found or not published')
    if (courses.some(c => c.enrollments.length)) return fail(res, 400, 'Student is already enrolled')
    const amount = courses.reduce((total, c) => total + Math.round(c.price * 100), 0)
    const order = await getRazorpay().orders.create({ amount, currency: 'INR', receipt: crypto.randomUUID() })
    await prisma.paymentOrder.create({ data: { id: order.id, userId: userId(req), courseIds: ids, amount } })
    res.json({ success: true, message: order })
})

async function enrollOrder(orderId, studentId) {
    // Claim and enroll inside one transaction. Retried verification is idempotent.
    return prisma.$transaction(async tx => {
        const claimed = await tx.paymentOrder.updateMany({ where: { id: orderId, userId: studentId, processed: false }, data: { processed: true } })
        if (!claimed.count) return []
        const order = await tx.paymentOrder.findUnique({ where: { id: orderId } })
        const courses = await tx.course.findMany({ where: { id: { in: order.courseIds } } })
        if (courses.length !== order.courseIds.length) throw new Error('A purchased course no longer exists')
        for (const course of courses) {
            const key = { userId: studentId, courseId: course.id }
            await tx.enrollment.upsert({ where: { userId_courseId: key }, create: key, update: {} })
            await tx.courseProgress.upsert({ where: { userId_courseId: key }, create: key, update: {} })
        }
        return courses
    })
}
const verifyPayment = handle(async (req, res) => {
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body
    if (!orderId || !paymentId || typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return fail(res, 400, 'Payment Failed')
    if (!process.env.RAZORPAY_SECRET) return fail(res, 503, 'Payments are not configured')
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(`${orderId}|${paymentId}`).digest()
    if (!crypto.timingSafeEqual(expected, Buffer.from(signature, 'hex'))) return fail(res, 400, 'Payment verification failed')
    const order = await prisma.paymentOrder.findUnique({ where: { id: orderId } })
    if (!order || order.userId !== userId(req)) return fail(res, 403, 'Payment order does not belong to this user')
    // Course IDs come from the stored order, never from the verification request.
    const courses = await enrollOrder(orderId, userId(req))
    if (courses.length) {
        const student = await prisma.user.findUnique({ where: { id: userId(req) } })
        for (const course of courses) {
            await mailSender(student.email, `Successfully enrolled into ${course.courseName}`, courseEnrollmentEmail(course.courseName, student.firstName))
                .catch(error => console.error('Enrollment email failed:', error.message))
        }
    }
    res.json({ success: true, message: 'Payment successful' })
})
const sendPaymentSuccessEmail = handle(async (req, res) => {
    const { orderId, paymentId } = req.body
    if (!orderId || !paymentId) return fail(res, 400, 'Please provide order and payment IDs')
    const order = await prisma.paymentOrder.findFirst({ where: { id: orderId, userId: userId(req), processed: true }, include: { user: true } })
    if (!order) return fail(res, 404, 'Verified payment not found')
    await mailSender(order.user.email, 'Payment Received', paymentSuccessEmail(order.user.firstName, order.amount / 100, orderId, paymentId))
    res.json({ success: true, message: 'Email sent' })
})
module.exports = { capturePayment, verifyPayment, sendPaymentSuccessEmail }

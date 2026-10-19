const { test } = require('node:test')
const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const crypto = require('node:crypto')

test('PostgreSQL API workflows and relational cleanup', { skip: !process.env.TEST_DATABASE_URL, timeout: 90000 }, async t => {
    // Refuse to run destructive fixture cleanup on an application database.
    const url = new URL(process.env.TEST_DATABASE_URL)
    assert.match(url.pathname, /_test$/, 'Use a disposable database whose name ends with _test')
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
    process.env.DIRECT_URL = process.env.TEST_DATABASE_URL
    process.env.JWT_SECRET = 'integration-test-secret'
    process.env.RAZORPAY_SECRET = 'integration-razorpay-secret'
    const migrate = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'], { cwd: require('node:path').resolve(__dirname, '..'), env: process.env, encoding: 'utf8' })
    assert.equal(migrate.status, 0, migrate.stdout + migrate.stderr)
    const mails = []
    const mail = require('../utils/mailSender')
    mail.mailSender = async (...args) => { mails.push(args); return { accepted: [args[0]] } }
    require('../utils/imageUploader').uploadOnCloudinary = async () => ({ secure_url: 'https://example.com/asset', duration: 65 })
    let orderCount = 0
    require('../config/Razorpay').getRazorpay = () => ({ orders: { create: async options => ({ id: `order_test_${++orderCount}`, ...options }) } })
    const { app } = require('../index')
    const { prisma } = require('../config/database')
    await prisma.user.deleteMany()
    await prisma.category.deleteMany()
    await prisma.otp.deleteMany()
    const server = app.listen(0, '127.0.0.1')
    await new Promise(resolve => server.once('listening', resolve))
    const base = `http://127.0.0.1:${server.address().port}`
    t.after(async () => {
        await new Promise(resolve => server.close(resolve))
        await prisma.user.deleteMany()
        await prisma.category.deleteMany()
        await prisma.otp.deleteMany()
        await prisma.$disconnect()
    })
    async function request(route, body, token, method = 'POST') {
        const response = await fetch(base + route, {
            method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }) },
            ...(body !== undefined ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
        })
        return { status: response.status, body: await response.json() }
    }
    const auth = '/api/v1/auth/'
    const course = '/api/v1/course/'
    const profile = '/api/v1/profile/'
    const payment = '/api/v1/payment/'
    async function signup(email, accountType) {
        assert.equal((await request(auth + 'sendotp', { email })).status, 200)
        const otp = await prisma.otp.findFirst({ where: { email }, orderBy: { createdAt: 'desc' } })
        const result = await request(auth + 'signup', { firstName: 'Test', lastName: accountType, email, password: 'secret123', confirmPassword: 'secret123', accountType, contactNumber: '0123456789', otp: otp.otp })
        assert.equal(result.status, 200, JSON.stringify(result.body))
        assert.ok(result.body.user._id)
        assert.equal(result.body.user.password, undefined)
        assert.equal(await prisma.otp.count({ where: { email } }), 0)
        const loggedIn = await request(auth + 'login', { email, password: 'secret123' })
        assert.equal(loggedIn.status, 200)
        assert.equal(loggedIn.body.user.additionalDetails.contactNumber, '')
        assert.equal(loggedIn.body.user.password, undefined)
        return { token: loggedIn.body.token, id: loggedIn.body.user._id }
    }
    const teacher = await signup('teacher@example.com', 'Instructor')
    const student = await signup('student@example.com', 'Student')
    const outsider = await signup('outsider@example.com', 'Student')
    const otherTeacher = await signup('other@example.com', 'Instructor')
    await t.test('expired OTP is rejected and cannot create a user', async () => {
        await prisma.otp.create({ data: { email: 'expired@example.com', otp: '123456', expiresAt: new Date(Date.now() - 1000) } })
        const result = await request(auth + 'signup', { firstName: 'Old', lastName: 'OTP', email: 'expired@example.com', password: 'secret123', confirmPassword: 'secret123', contactNumber: '', accountType: 'Student', otp: '123456' })
        assert.equal(result.status, 400)
        assert.equal(await prisma.user.count({ where: { email: 'expired@example.com' } }), 0)
    })
    const { seed } = require('../prisma/seed')
    await seed(); await seed()
    const categories = await request(course + 'showAllCategories', undefined, null, 'GET')
    assert.equal(categories.body.allCategory.length, 5)
    const categoryId = categories.body.allCategory[0]._id
    const categoryPage = await request(course + 'getCategoryPageDetails', { categoryId })
    assert.equal(categoryPage.status, 200)
    const form = new FormData()
    for (const [key, value] of Object.entries({ courseName: 'Prisma Course', courseDescription: 'SQL course', whatYouWillLearn: 'Relations', category: categoryId, price: '12.75', courseTags: '["SQL"]', instructions: '["Learn"]', status: 'Published' })) form.append(key, value)
    form.append('image', new Blob(['image'], { type: 'image/png' }), 'image.png')
    const created = await request(course + 'createCourse', form, teacher.token)
    assert.equal(created.status, 200, JSON.stringify(created.body))
    const courseId = created.body.data._id
    assert.equal(created.body.data.price, 12.75)
    assert.equal(created.body.data.instructor._id, teacher.id)
    assert.equal(created.body.data.instructor.password, undefined)
    const sectionResponse = await request(course + 'addSection', { sectionName: 'Intro', courseId }, teacher.token)
    assert.equal(sectionResponse.status, 200)
    const sectionId = sectionResponse.body.updateCourseDetails.courseContent[0]._id
    const lessonForm = new FormData()
    lessonForm.append('title', 'First lesson'); lessonForm.append('description', 'Details'); lessonForm.append('sectionId', sectionId)
    lessonForm.append('video', new Blob(['video'], { type: 'video/mp4' }), 'video.mp4')
    const lessonResponse = await request(course + 'addSubSection', lessonForm, teacher.token)
    assert.equal(lessonResponse.status, 200)
    const lessonId = lessonResponse.body.data.subSection[0]._id
    await t.test('course responses preserve frontend fields and protect videos and credentials', async () => {
        const detail = await request(course + 'getCourseDetails', { courseId })
        assert.equal(detail.status, 200)
        assert.equal(detail.body.data.courseDetails.courseContent[0].subSection[0].videoUrl, undefined)
        assert.equal(detail.body.data.courseDetails.instructor.password, undefined)
        const catalog = await request(course + 'getCategoryPageDetails', { categoryId })
        assert.equal(catalog.body.data.selectedCategory.course[0].courseContent[0].subSection[0].videoUrl, undefined)
        assert.equal((await request(course + 'getfullCourseDetails', { courseId }, outsider.token)).status, 403)
        assert.equal((await request(course + 'deleteCourse', { data: courseId })).status, 401)
        assert.equal((await request(course + 'deleteCourse', { data: courseId }, otherTeacher.token)).status, 403)
        assert.equal((await request(course + 'editCourse', { courseId, courseName: 'Updated SQL' }, teacher.token)).status, 200)
    })
    let orderId
    let paymentId = 'pay_test'
    await t.test('payment verification binds the order to its buyer and enrolls idempotently', async () => {
        const captured = await request(payment + 'capturePayment', { courses: [[courseId, courseId]] }, student.token)
        assert.equal(captured.status, 200)
        assert.equal(captured.body.message.amount, 1275)
        orderId = captured.body.message.id
        const signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(`${orderId}|${paymentId}`).digest('hex')
        const payload = { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, courses: ['tampered-course'] }
        assert.equal((await request(payment + 'verifyPayment', payload, outsider.token)).status, 403)
        for (let i = 0; i < 2; i++) assert.equal((await request(payment + 'verifyPayment', payload, student.token)).status, 200)
        assert.equal(await prisma.enrollment.count({ where: { courseId } }), 1)
        assert.equal(await prisma.courseProgress.count({ where: { courseId } }), 1)
        assert.equal((await request(payment + 'capturePayment', { courses: [courseId] }, student.token)).status, 400)
        const enrolled = await request(profile + 'getEnrolledCourses', undefined, student.token, 'GET')
        assert.equal(enrolled.body.data.course[0]._id, courseId)
        const full = await request(course + 'getfullCourseDetails', { courseId }, student.token)
        assert.equal(full.body.data.courseDetails.courseContent[0].subSection[0].videoUrl, 'https://example.com/asset')
    })
    await t.test('course progress, reviews and profiles persist with relation constraints', async () => {
        for (let i = 0; i < 2; i++) assert.equal((await request(course + 'updateCourseProgress', { courseId, subSectionId: lessonId }, student.token)).status, 200)
        assert.equal(await prisma.videoCompletion.count(), 1)
        const full = await request(course + 'getfullCourseDetails', { courseId }, student.token)
        assert.deepEqual(full.body.data.completedVideos, [lessonId])
        assert.equal((await request(course + 'createRating', { courseId, rating: 5, review: 'Good' }, outsider.token)).status, 403)
        assert.equal((await request(course + 'createRating', { courseId, rating: 5, review: 'Good' }, student.token)).status, 200)
        assert.equal((await request(course + 'createRating', { courseId, rating: 4, review: 'Again' }, student.token)).status, 403)
        const avg = await request(course + 'getAverageRating?courseId=' + courseId, undefined, null, 'GET')
        assert.equal(avg.body.averageRating, 5)
        const reviews = await request(course + 'getReviews', undefined, null, 'GET')
        assert.equal(reviews.body.data[0].user._id, student.id)
        assert.equal(reviews.body.data[0].user.password, undefined)
        const updated = await request(profile + 'updateProfile', { about: 'SQL student', contactNumber: '0012345678' }, student.token, 'PUT')
        assert.equal(updated.body.profileDetails.contactNumber, '0012345678')
        const details = await request(profile + 'getUserDetails', undefined, student.token, 'GET')
        assert.equal(details.body.userDetail.additionalDetails.about, 'SQL student')
        const dashboard = await request(profile + 'getInstructorData', undefined, teacher.token, 'GET')
        assert.equal(dashboard.body.data[0].totalStudentsEnrolled, 1)
    })
    await t.test('section and lesson updates/deletes return the existing builder response shapes', async () => {
        const section = await request(course + 'addSection', { sectionName: 'Temporary', courseId }, teacher.token)
        const temporary = section.body.updateCourseDetails.courseContent.find(s => s.sectionName === 'Temporary')
        assert.ok(temporary._id)
        assert.equal((await request(course + 'updateSection', { sectionId: temporary._id, sectionName: 'Renamed' }, teacher.token)).body.data.sectionName, 'Renamed')
        assert.equal((await request(course + 'updateSubSection', { subSectionId: lessonId, sectionId, title: 'Edited lesson' }, teacher.token)).body.data.subSection[0].title, 'Edited lesson')
        const extra = await prisma.subSection.create({ data: { title: 'Delete me', sectionId: temporary._id } })
        const deleted = await request(course + 'deleteSubSection', { subSectionId: extra.id, sectionId: temporary._id }, teacher.token)
        assert.equal(deleted.status, 200)
        assert.deepEqual(deleted.body.data.subSection, [])
        assert.equal((await request(course + 'deleteSection', { sectionId: temporary._id, courseId }, teacher.token)).status, 200)
        assert.equal(await prisma.section.count({ where: { id: temporary._id } }), 0)
    })
    await t.test('failed enrollment rolls back the order claim', async () => {
        const brokenId = 'order_missing_course'
        await prisma.paymentOrder.create({ data: { id: brokenId, userId: outsider.id, courseIds: ['missing-course'], amount: 100 } })
        const signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(`${brokenId}|pay_missing`).digest('hex')
        const result = await request(payment + 'verifyPayment', { razorpay_order_id: brokenId, razorpay_payment_id: 'pay_missing', razorpay_signature: signature }, outsider.token)
        assert.equal(result.status, 500)
        assert.equal((await prisma.paymentOrder.findUnique({ where: { id: brokenId } })).processed, false)
        assert.equal(await prisma.enrollment.count({ where: { userId: outsider.id } }), 0)
    })
    await t.test('reset password token is expiring and single use', async () => {
        assert.equal((await request(auth + 'reset-password-token', { email: 'student@example.com' })).status, 200)
        const user = await prisma.user.findUnique({ where: { id: student.id } })
        const payload = { token: user.token, password: 'new-secret', confirmPassword: 'new-secret' }
        assert.equal((await request(auth + 'reset-password', payload)).status, 200)
        assert.equal((await request(auth + 'reset-password', payload)).status, 400)
        assert.equal((await request(auth + 'login', { email: user.email, password: 'new-secret' })).status, 200)
    })
    await t.test('account deletion leaves purchased courses intact; course deletion cascades', async () => {
        assert.equal((await request(profile + 'deleteProfile', undefined, student.token, 'DELETE')).status, 200)
        assert.equal(await prisma.course.count({ where: { id: courseId } }), 1)
        assert.equal(await prisma.enrollment.count(), 0)
        assert.equal(await prisma.courseProgress.count(), 0)
        assert.equal(await prisma.videoCompletion.count(), 0)
        assert.equal(await prisma.ratingAndReview.count(), 0)
        await prisma.enrollment.create({ data: { userId: outsider.id, courseId } })
        await prisma.courseProgress.create({ data: { userId: outsider.id, courseId, completedVideo: { create: { subSectionId: lessonId } } } })
        await prisma.ratingAndReview.create({ data: { userId: outsider.id, courseId, rating: 4, review: 'Cascade fixture' } })
        assert.equal((await request(course + 'deleteCourse', { data: courseId }, teacher.token)).status, 200)
        assert.equal(await prisma.enrollment.count(), 0)
        assert.equal(await prisma.courseProgress.count(), 0)
        assert.equal(await prisma.videoCompletion.count(), 0)
        assert.equal(await prisma.ratingAndReview.count(), 0)
        assert.ok(await prisma.user.findUnique({ where: { id: outsider.id } }))
        assert.equal(await prisma.section.count(), 0)
        assert.equal(await prisma.subSection.count(), 0)
        assert.equal((await request('/health', undefined, null, 'GET')).status, 200)
    })
    assert.ok(mails.length >= 5)
})

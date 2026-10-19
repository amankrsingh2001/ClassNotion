const { prisma } = require('../config/database')
const { handle, fail, userId } = require('../utils/http')
const { apiData } = require('../utils/apiData')
const person = { id: true, firstName: true, lastName: true, image: true }
async function threadAccess(req, res) {
    const thread = await prisma.conversation.findUnique({ where: { id: req.params.threadId }, include: { course: { select: { instructorId: true } } } })
    if (!thread) { fail(res, 404, 'Conversation not found'); return null }
    if (![thread.studentId, thread.course.instructorId].includes(userId(req))) { fail(res, 403, 'This conversation is private'); return null }
    if (!await prisma.enrollment.findUnique({ where: { userId_courseId: { courseId: thread.courseId, userId: thread.studentId } } })) { fail(res, 403, 'Course enrollment is required for this conversation'); return null }
    return thread
}
const startConversation = handle(async (req, res) => {
    if (typeof req.body.courseId !== 'string') return fail(res, 400, 'Choose a course')
    const course = await prisma.course.findUnique({ where: { id: req.body.courseId }, select: { id: true, instructorId: true } })
    if (!course) return fail(res, 404, 'Course not found')
    if (course.instructorId === userId(req)) return fail(res, 400, 'Students start conversations from their enrolled courses')
    if (!await prisma.enrollment.findUnique({ where: { userId_courseId: { courseId: course.id, userId: userId(req) } } })) return fail(res, 403, 'Purchase or enroll in this course to contact the instructor')
    const thread = await prisma.conversation.upsert({ where: { courseId_studentId: { courseId: course.id, studentId: userId(req) } }, create: { courseId: course.id, studentId: userId(req) }, update: {} })
    res.json({ success: true, thread: apiData(thread) })
})
const listConversations = handle(async (req, res) => {
    const conversations = await prisma.conversation.findMany({ where: { OR: [{ studentId: userId(req) }, { course: { instructorId: userId(req) } }] }, include: { course: { select: { id: true, courseName: true, instructor: { select: person } } }, student: { select: person }, messages: { take: 1, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] } }, orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }] })
    const enrollments = await prisma.enrollment.findMany({ where: { OR: conversations.map(item => ({ courseId: item.courseId, userId: item.studentId })) }, select: { courseId: true, userId: true } })
    const allowed = new Set(enrollments.map(item => `${item.courseId}:${item.userId}`))
    res.json({ success: true, conversations: apiData(conversations.filter(item => allowed.has(`${item.courseId}:${item.studentId}`))) })
})
const getMessages = handle(async (req, res) => {
    if (!await threadAccess(req, res)) return
    const before = req.query.before
    if (before && !await prisma.message.findFirst({ where: { id: before, conversationId: req.params.threadId } })) return fail(res, 400, 'Invalid message cursor')
    const messages = await prisma.message.findMany({ where: { conversationId: req.params.threadId }, ...(before ? { cursor: { id: before }, skip: 1 } : {}), take: 51, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] })
    const hasMore = messages.length > 50
    res.json({ success: true, hasMore, messages: apiData(messages.slice(0, 50).reverse()) })
})
const sendMessage = handle(async (req, res) => {
    const thread = await threadAccess(req, res)
    if (!thread) return
    if (typeof req.body.body !== 'string' || !req.body.body.trim() || req.body.body.length > 5000) return fail(res, 400, 'Write a message between 1 and 5,000 characters')
    const message = await prisma.$transaction(async tx => {
        const message = await tx.message.create({ data: { conversationId: thread.id, senderId: userId(req), body: req.body.body.trim() } })
        await tx.conversation.update({ where: { id: thread.id }, data: { updatedAt: new Date() } })
        return message
    })
    res.status(201).json({ success: true, message: apiData(message) })
})
module.exports = { startConversation, listConversations, getMessages, sendMessage }

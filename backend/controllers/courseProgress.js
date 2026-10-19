const { prisma } = require('../config/database')
const { handle, fail, userId } = require('../utils/http')

const updateCourseProgress = handle(async (req, res) => {
    const { courseId, subSectionId } = req.body
    if (!courseId || !subSectionId) return fail(res, 400, 'Course and lesson IDs are required')
    const key = { userId: userId(req), courseId }
    if (!await prisma.enrollment.findUnique({ where: { userId_courseId: key } })) return fail(res, 403, 'You are not enrolled in this course')
    const video = await prisma.subSection.findFirst({ where: { id: subSectionId, section: { courseId } } })
    if (!video) return fail(res, 404, 'Cannot find subSection in this course')
    await prisma.$transaction(async tx => {
        const progress = await tx.courseProgress.upsert({ where: { userId_courseId: key }, create: key, update: {} })
        await tx.videoCompletion.createMany({ data: [{ progressId: progress.id, subSectionId }], skipDuplicates: true })
    })
    res.json({ success: true, message: 'Course progress added' })
})
module.exports = { updateCourseProgress }

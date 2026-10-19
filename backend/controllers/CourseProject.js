const { prisma } = require('../config/database')
const { handle, fail, userId } = require('../utils/http')
const { lessonFolder } = require('../utils/educatorPolicy')
const { apiData } = require('../utils/apiData')
async function courseAccess(req, res, write = false) {
    const course = await prisma.course.findUnique({ where: { id: req.params.courseId }, select: { id: true, instructorId: true, projectType: true } })
    if (!course) { fail(res, 404, 'Course not found'); return null }
    const owner = course.instructorId === userId(req)
    const enrolled = !write && await prisma.enrollment.findUnique({ where: { userId_courseId: { courseId: course.id, userId: userId(req) } } })
    if (!owner && !enrolled) { fail(res, 403, write ? 'Only the course instructor can organize lessons' : 'Enroll in this course to access its folders'); return null }
    return course
}
const getFolders = handle(async (req, res) => {
    const course = await courseAccess(req, res)
    if (!course) return
    const folders = await prisma.courseFolder.findMany({ where: { courseId: course.id }, orderBy: { path: 'asc' } })
    // Folder listing never bypasses the normal lesson-video access checks.
    const lessons = await prisma.subSection.findMany({ where: { section: { courseId: course.id } }, select: { id: true, title: true, sectionId: true, folderId: true }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] })
    res.json({ success: true, projectType: course.projectType, canEdit: course.instructorId === userId(req), folders: apiData(folders), lessons: apiData(lessons) })
})
const addFolder = handle(async (req, res) => {
    const course = await courseAccess(req, res, true)
    if (!course) return
    if (!course.projectType) return fail(res, 400, 'Choose a project type in course details first')
    const parsed = lessonFolder.safeParse(req.body)
    if (!parsed.success) return fail(res, 400, parsed.error.issues[0].message)
    const { name, parentId } = parsed.data
    const parent = parentId && await prisma.courseFolder.findFirst({ where: { id: parentId, courseId: course.id } })
    if (parentId && !parent) return fail(res, 400, 'Choose a folder belonging to this course')
    const path = parent ? `${parent.path}/${name}` : name
    if (path.split('/').length > 12) return fail(res, 400, 'Folders can be nested up to 12 levels')
    if (await prisma.courseFolder.count({ where: { courseId: course.id } }) >= 200) return fail(res, 400, 'This course supports up to 200 folders')
    const folder = await prisma.courseFolder.create({ data: { courseId: course.id, name, parentId, path } })
    res.status(201).json({ success: true, folder: apiData(folder) })
})
const assignLesson = handle(async (req, res) => {
    const course = await courseAccess(req, res, true)
    if (!course) return
    const { folderId } = req.body
    if (folderId !== null && typeof folderId !== 'string') return fail(res, 400, 'Choose a folder or the course root')
    if (folderId && !await prisma.courseFolder.findFirst({ where: { id: folderId, courseId: course.id } })) return fail(res, 400, 'Folder does not belong to this course')
    const lesson = await prisma.subSection.findFirst({ where: { id: req.params.lessonId, section: { courseId: course.id } } })
    if (!lesson) return fail(res, 404, 'Lesson not found in this course')
    const updated = await prisma.subSection.update({ where: { id: lesson.id }, data: { folderId } })
    res.json({ success: true, lesson: apiData({ id: updated.id, title: updated.title, folderId: updated.folderId }) })
})
const deleteFolder = handle(async (req, res) => {
    const course = await courseAccess(req, res, true)
    if (!course) return
    const folder = await prisma.courseFolder.findFirst({ where: { id: req.params.folderId, courseId: course.id } })
    if (!folder) return fail(res, 404, 'Folder not found')
    // Nested folders are removed; their lessons remain in the course root.
    await prisma.courseFolder.delete({ where: { id: folder.id } })
    res.json({ success: true })
})
module.exports = { getFolders, addFolder, assignLesson, deleteFolder }

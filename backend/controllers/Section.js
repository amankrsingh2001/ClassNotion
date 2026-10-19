const { prisma } = require('../config/database')
const { apiData, courseInclude } = require('../utils/apiData')
const { handle, fail } = require('../utils/http')
const { ownsCourse, ownsSection } = require('../utils/courseAccess')

const createSection = handle(async (req, res) => {
    const { sectionName, courseId } = req.body
    if (!sectionName || !courseId) return fail(res, 400, 'Section name and course ID are required')
    if (!await ownsCourse(req, res, courseId)) return
    const course = await prisma.$transaction(async tx => {
        await tx.section.create({ data: { sectionName, courseId } })
        return tx.course.findUnique({ where: { id: courseId }, include: courseInclude })
    })
    res.json({ success: true, message: 'Section added Successfully', updateCourseDetails: apiData(course) })
})
const updateSection = handle(async (req, res) => {
    const { sectionId, sectionName } = req.body
    if (!sectionName || !sectionId) return fail(res, 400, 'Missing data')
    if (!await ownsSection(req, res, sectionId)) return
    const section = await prisma.section.update({ where: { id: sectionId }, data: { sectionName }, include: { subSection: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } } })
    res.json({ success: true, message: 'Section updated Successfully', data: apiData(section) })
})
const deleteSection = handle(async (req, res) => {
    const section = await ownsSection(req, res, req.body.sectionId)
    if (!section) return
    if (req.body.courseId && section.courseId !== req.body.courseId) return fail(res, 400, 'Section does not belong to this course')
    const deleted = await prisma.section.delete({ where: { id: section.id } })
    res.json({ success: true, message: 'Section deleted Successfully', data: apiData(deleted) })
})
module.exports = { createSection, updateSection, deleteSection }

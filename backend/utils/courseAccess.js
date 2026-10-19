const { prisma } = require('../config/database')
const { fail, userId } = require('./http')
async function ownsCourse(req, res, courseId) {
    const course = courseId && await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) { fail(res, 404, 'Course not found'); return false }
    if (course.instructorId !== userId(req)) { fail(res, 403, 'You do not own this course'); return false }
    return true
}
async function ownsSection(req, res, sectionId) {
    const section = sectionId && await prisma.section.findUnique({ where: { id: sectionId } })
    if (!section) { fail(res, 404, 'Section not found'); return null }
    return await ownsCourse(req, res, section.courseId) ? section : null
}
module.exports = { ownsCourse, ownsSection }

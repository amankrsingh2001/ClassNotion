const { prisma } = require('../config/database')
const { apiData, publicCourseInclude } = require('../utils/apiData')
const { handle, fail } = require('../utils/http')

// Public profiles deliberately exclude email, phone numbers and auth fields.
const educatorSelect = {
    id: true, firstName: true, lastName: true, image: true,
    educatorApplication: { select: { status: true, headline: true, about: true, yearsExperience: true, youtubeUrl: true, careerHistory: true, certificates: true } },
    additionalDetails: { select: { about: true, profession: true } },
}
const publishedCourses = { status: 'Published' }
const view = educator => ({
    _id: educator.id, firstName: educator.firstName, lastName: educator.lastName,
    image: educator.image, about: educator.additionalDetails?.about || '',
    profession: educator.additionalDetails?.profession || 'Educator',
    professionalProfile: educator.educatorApplication?.status === 'Approved' ? educator.educatorApplication : null,
    courseCount: educator.teachingCourses.length,
    courses: apiData(educator.teachingCourses),
})
const listEducators = handle(async (req, res) => {
    const educators = await prisma.user.findMany({
        where: { accountType: 'Instructor', educatorApplication: { status: 'Approved' }, teachingCourses: { some: publishedCourses } },
        select: { ...educatorSelect, teachingCourses: {
            where: publishedCourses,
            select: { id: true, courseName: true, thumbnail: true, tag: true },
            orderBy: { createdAt: 'desc' },
        } },
        orderBy: [{ firstName: 'asc' }, { id: 'asc' }],
    })
    res.json({ success: true, educators: educators.map(view) })
})
const getEducator = handle(async (req, res) => {
    const educator = await prisma.user.findFirst({
        where: { id: req.params.educatorId, accountType: 'Instructor', educatorApplication: { status: 'Approved' } },
        select: { ...educatorSelect, teachingCourses: {
            where: publishedCourses, include: publicCourseInclude, orderBy: { createdAt: 'desc' },
        } },
    })
    if (!educator) return fail(res, 404, 'Educator not found')
    res.json({ success: true, educator: view(educator) })
})
module.exports = { listEducators, getEducator }

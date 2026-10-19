const { prisma } = require('../config/database')
const { handle, fail, userId } = require('../utils/http')
const { professionalProfile } = require('../utils/educatorPolicy')
const { apiData } = require('../utils/apiData')
const ownApplication = handle(async (req, res) => {
    const application = await prisma.educatorApplication.findUnique({ where: { userId: userId(req) } })
    res.json({ success: true, application: apiData(application) })
})
const submitApplication = handle(async (req, res) => {
    const parsed = professionalProfile.safeParse(req.body)
    if (!parsed.success) return fail(res, 400, parsed.error.issues[0].path.join('.') + ': ' + parsed.error.issues[0].message)
    const application = await prisma.$transaction(async tx => {
        const existing = await tx.educatorApplication.findUnique({ where: { userId: userId(req) } })
        if (existing && ['Pending', 'Approved'].includes(existing.status)) {
            const error = new Error('Your profile is already submitted. Contact an admin to request changes.'); error.status = 409; throw error
        }
        const data = { ...parsed.data, status: 'Pending', submittedAt: new Date(), reviewNote: '', reviewedAt: null, reviewedBy: null }
        return tx.educatorApplication.upsert({ where: { userId: userId(req) }, create: { userId: userId(req), ...data }, update: data })
    })
    res.json({ success: true, application: apiData(application) })
})
const listApplications = handle(async (req, res) => {
    const applications = await prisma.educatorApplication.findMany({ where: { status: 'Pending' }, include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } }, orderBy: { submittedAt: 'asc' } })
    res.json({ success: true, applications: apiData(applications) })
})
const reviewApplication = handle(async (req, res) => {
    const { decision, reviewNote } = req.body
    if (!['Approved', 'Rejected'].includes(decision) || typeof reviewNote !== 'string' || reviewNote.trim().length < 5 || reviewNote.length > 2000) return fail(res, 400, 'Choose a decision and provide a review note (5–2000 characters)')
    const application = await prisma.$transaction(async tx => {
        const current = await tx.educatorApplication.findUnique({ where: { id: req.params.applicationId } })
        if (!current) { const error = new Error('Application not found'); error.status = 404; throw error }
        if (current.userId === userId(req)) { const error = new Error('You cannot review your own application'); error.status = 403; throw error }
        const changed = await tx.educatorApplication.updateMany({ where: { id: current.id, status: 'Pending' }, data: { status: decision, reviewNote: reviewNote.trim(), reviewedAt: new Date(), reviewedBy: userId(req) } })
        if (!changed.count) { const error = new Error('This application has already been reviewed'); error.status = 409; throw error }
        if (decision === 'Approved') {
            await tx.user.update({ where: { id: current.userId }, data: { accountType: 'Instructor', additionalDetails: { upsert: { create: { about: current.about, profession: current.headline }, update: { about: current.about, profession: current.headline } } } } })
        }
        return tx.educatorApplication.findUnique({ where: { id: current.id } })
    })
    res.json({ success: true, application: apiData(application) })
})
module.exports = { ownApplication, submitApplication, listApplications, reviewApplication }

const { prisma } = require('../config/database')
const { uploadOnCloudinary } = require('../utils/imageUploader')
const { apiData } = require('../utils/apiData')
const { handle, fail } = require('../utils/http')
const { ownsSection } = require('../utils/courseAccess')
const include = { subSection: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } }

const createSubSection = handle(async (req, res) => {
    const { title, description, sectionId } = req.body
    if (!title || !sectionId || !req.files?.video) return fail(res, 400, 'Title, section ID and video are required')
    if (!await ownsSection(req, res, sectionId)) return
    const upload = await uploadOnCloudinary(req.files.video, process.env.FOLDER_NAME)
    const section = await prisma.$transaction(async tx => {
        await tx.subSection.create({ data: { title, description, sectionId, timeDuration: String(upload.duration || 0), videoUrl: upload.secure_url } })
        return tx.section.findUnique({ where: { id: sectionId }, include })
    })
    res.json({ success: true, message: 'SubSection created Successfully', data: apiData(section) })
})
const updateSubSection = handle(async (req, res) => {
    const { subSectionId, title, description, sectionId } = req.body
    if (!subSectionId || !sectionId) return fail(res, 400, 'Lesson and section IDs are required')
    if (!await ownsSection(req, res, sectionId)) return
    const video = await prisma.subSection.findUnique({ where: { id: subSectionId } })
    if (!video || video.sectionId !== sectionId) return fail(res, 404, 'Cannot find sub-section in this section')
    const data = { title, description }
    if (req.files?.video) {
        const upload = await uploadOnCloudinary(req.files.video, process.env.FOLDER_NAME)
        data.videoUrl = upload.secure_url
        data.timeDuration = String(upload.duration || 0)
    }
    const section = await prisma.$transaction(async tx => {
        await tx.subSection.update({ where: { id: subSectionId }, data })
        return tx.section.findUnique({ where: { id: sectionId }, include })
    })
    res.json({ success: true, message: 'SubSection updated Successfully', data: apiData(section) })
})
const deleteSubSection = handle(async (req, res) => {
    const { subSectionId, sectionId } = req.body
    if (!subSectionId || !sectionId) return fail(res, 400, 'Lesson and section IDs are required')
    if (!await ownsSection(req, res, sectionId)) return
    const video = await prisma.subSection.findUnique({ where: { id: subSectionId } })
    if (!video || video.sectionId !== sectionId) return fail(res, 404, 'Sub-section not found')
    const section = await prisma.$transaction(async tx => {
        await tx.subSection.delete({ where: { id: subSectionId } })
        return tx.section.findUnique({ where: { id: sectionId }, include })
    })
    res.json({ success: true, message: 'Deleted Sub-section successfully', data: apiData(section) })
})
module.exports = { createSubSection, updateSubSection, deleteSubSection }

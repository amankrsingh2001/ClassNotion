const { prisma } = require('../config/database')
const { uploadOnCloudinary } = require('../utils/imageUploader')
const { apiData, userInclude } = require('../utils/apiData')
const { handle, fail, userId } = require('../utils/http')

const updateProfile = handle(async (req, res) => {
    const { dateOfBirth = '', about = '', contactNumber = '', gender, profession } = req.body
    const data = { dateOfBirth, about, contactNumber: String(contactNumber), gender, profession }
    const profile = await prisma.profile.upsert({ where: { userId: userId(req) }, create: { userId: userId(req), ...data }, update: data })
    res.json({ success: true, message: 'Profile Updated Successfully', profileDetails: apiData(profile) })
})
const deleteAccount = handle(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: userId(req) } })
    if (!user) return fail(res, 404, 'User not found')
    // Cascade removes owned courses and dependent rows; other instructors' courses remain.
    await prisma.user.delete({ where: { id: user.id } })
    res.json({ success: true, succss: true, message: 'User Deleted Successfully' })
})
const getUserDetails = handle(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: userId(req) }, include: userInclude })
    if (!user) return fail(res, 404, 'User not found')
    res.json({ success: true, message: 'User details fetched successfully', userDetail: apiData(user) })
})
const updateDisplayPicture = handle(async (req, res) => {
    if (!req.files?.displayPicture) return fail(res, 400, 'Display picture is required')
    const image = await uploadOnCloudinary(req.files.displayPicture, process.env.FOLDER_NAME, 1000, 1000)
    const user = await prisma.user.update({ where: { id: userId(req) }, data: { image: image.secure_url }, include: userInclude })
    res.json({ success: true, message: 'Image Updated Successfully', data: apiData(user) })
})
const getEnrolledCourse = handle(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: userId(req) }, include: userInclude })
    if (!user) return fail(res, 404, 'User not found')
    const data = apiData(user)
    res.json({ success: true, data: { course: data.courses, courseProgress: data.courseProgress } })
})
const instructorDashboard = handle(async (req, res) => {
    const courses = await prisma.course.findMany({ where: { instructorId: userId(req) }, include: { _count: { select: { enrollments: true } } } })
    const data = courses.map(c => ({ _id: c.id, courseName: c.courseName, courseDescription: c.courseDescription, totalStudentsEnrolled: c._count.enrollments, totalAmountGenerated: c._count.enrollments * c.price }))
    res.json({ success: true, data })
})
module.exports = { updateProfile, deleteAccount, getUserDetails, updateDisplayPicture, getEnrolledCourse, instructorDashboard }

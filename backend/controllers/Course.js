const { prisma } = require('../config/database')
const { uploadOnCloudinary } = require('../utils/imageUploader')
const { apiData, courseInclude } = require('../utils/apiData')
const { handle, fail, userId } = require('../utils/http')
const { projectType } = require('../utils/educatorPolicy')
const { convertSecondsToDuration } = require('../utils/secToDuration')

function stringArray(value, fallback = []) {
    const result = value === undefined ? fallback : typeof value === 'string' ? JSON.parse(value) : value
    if (!Array.isArray(result) || result.some(item => typeof item !== 'string')) {
        const error = new Error('Tags and instructions must be arrays of strings'); error.status = 400; throw error
    }
    return result
}
const createCourse = handle(async (req, res) => {
    const { courseName, courseDescription, whatYouWillLearn, category, price, courseTags, instructions, status = 'Draft' } = req.body
    if (!courseName || !courseDescription || !category || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0 || !['Draft', 'Published'].includes(status)) return fail(res, 400, 'Please provide valid course details')
    if (!projectType.safeParse(req.body.projectType).success) return fail(res, 400, 'Choose a valid project type before creating a course')
    if (!req.files?.image) return fail(res, 400, 'Course image is required')
    if (!await prisma.category.findUnique({ where: { id: category } })) return fail(res, 404, 'Category details not found')
    const tags = stringArray(courseTags)
    const instructionsArray = stringArray(instructions)
    const image = await uploadOnCloudinary(req.files.image, process.env.FOLDER_NAME)
    const course = await prisma.course.create({
        data: { courseName, courseDescription, whatYouWillLearn, categoryId: category, instructorId: userId(req), projectType: req.body.projectType, price: Number(price), tag: tags, instructions: instructionsArray, status, thumbnail: image.secure_url },
        include: courseInclude,
    })
    res.json({ success: true, message: 'Course created', data: apiData(course) })
})
const editCourse = handle(async (req, res) => {
    const { courseId } = req.body
    if (!courseId) return fail(res, 400, 'courseId is required')
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return fail(res, 404, 'Course not found')
    if (course.instructorId !== userId(req)) return fail(res, 403, 'You do not own this course')
    const data = {}
    if (req.body.projectType !== undefined) {
        if (!projectType.safeParse(req.body.projectType).success) return fail(res, 400, 'Invalid project type')
        data.projectType = req.body.projectType
    }
    if (req.body.status === 'Published') {
        const application = await prisma.educatorApplication.findUnique({ where: { userId: userId(req) } })
        if (application?.status !== 'Approved') return fail(res, 403, 'Educator approval is required to publish')
        if (!course.projectType && !data.projectType) return fail(res, 400, 'Choose a project type before publishing')
    }
    for (const key of ['courseName', 'courseDescription', 'whatYouWillLearn', 'status']) {
        if (req.body[key] !== undefined) data[key] = req.body[key]
    }
    if (data.status && !['Draft', 'Published'].includes(data.status)) return fail(res, 400, 'Invalid course status')
    if (req.body.price !== undefined) {
        data.price = Number(req.body.price)
        if (!Number.isFinite(data.price) || data.price < 0) return fail(res, 400, 'Invalid price')
    }
    if (req.body.category) data.categoryId = req.body.category
    if (req.body.tag !== undefined || req.body.courseTags !== undefined) data.tag = stringArray(req.body.tag ?? req.body.courseTags)
    if (req.body.instructions !== undefined) data.instructions = stringArray(req.body.instructions)
    const thumbnail = req.files?.image || req.files?.courseImage || req.files?.thumbnailImage
    if (thumbnail) data.thumbnail = (await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME)).secure_url
    const updated = await prisma.course.update({ where: { id: courseId }, data, include: courseInclude })
    res.json({ success: true, message: 'Course updated successfully', data: apiData(updated) })
})
function duration(course) {
    const seconds = course.courseContent.reduce((sum, section) => sum + section.subSection.reduce((n, video) => n + (Number(video.timeDuration) || 0), 0), 0)
    return convertSecondsToDuration(seconds)
}
const getCourseDetails = handle(async (req, res) => {
    const { courseId } = req.body
    if (!courseId) return fail(res, 400, 'courseId is required')
    const course = await prisma.course.findUnique({ where: { id: courseId }, include: courseInclude })
    if (!course) return fail(res, 404, 'Course not found')
    const data = apiData(course)
    for (const section of data.courseContent) for (const video of section.subSection) delete video.videoUrl
    res.json({ success: true, data: { courseDetails: data, totalDuration: duration(course) } })
})
const getFullCourseDetails = handle(async (req, res) => {
    const { courseId } = req.body
    if (!courseId) return fail(res, 400, 'courseId is required')
    const course = await prisma.course.findUnique({ where: { id: courseId }, include: courseInclude })
    if (!course) return fail(res, 404, 'Course not found')
    if (course.instructorId !== userId(req) && !course.enrollments.some(e => e.userId === userId(req))) return fail(res, 403, 'You are not enrolled in this course')
    const progress = await prisma.courseProgress.findUnique({ where: { userId_courseId: { userId: userId(req), courseId } }, include: { completedVideo: true } })
    res.json({ success: true, data: { courseDetails: apiData(course), totalDuration: duration(course), completedVideos: progress?.completedVideo.map(v => v.subSectionId) || [] } })
})
const showAllCourses = handle(async (req, res) => {
    const courses = await prisma.course.findMany({ where: { status: 'Published' }, include: courseInclude, orderBy: { createdAt: 'desc' } })
    // Public course cards never include paid video URLs.
    const data = apiData(courses)
    for (const course of data) for (const section of course.courseContent) for (const video of section.subSection) delete video.videoUrl
    res.json({ success: true, message: 'Successfully fetched all courses data', course: data })
})
const getInstructorCourses = handle(async (req, res) => {
    const courses = await prisma.course.findMany({ where: { instructorId: userId(req) }, include: courseInclude, orderBy: { createdAt: 'desc' } })
    res.json({ success: true, data: apiData(courses) })
})
const deleteCourses = handle(async (req, res) => {
    const courseId = req.body.data || req.body.courseId
    if (!courseId) return fail(res, 400, 'courseId is required')
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return fail(res, 404, 'Course not found')
    if (course.instructorId !== userId(req)) return fail(res, 403, 'You do not own this course')
    // Foreign keys cascade through lessons, enrollments, reviews and progress.
    await prisma.course.delete({ where: { id: courseId } })
    res.json({ success: true, message: 'Course deleted Successfully' })
})
const enrollFreeCourse = handle(async (req, res) => {
    const { courseId } = req.body
    if (!courseId) return fail(res, 400, 'Course ID is required')
    // Read and enroll in one serializable transaction so a concurrent price or
    // publication change cannot accidentally grant access to a paid course.
    await prisma.$transaction(async tx => {
        const course = await tx.course.findUnique({ where: { id: courseId } })
        if (!course || course.status !== 'Published') {
            const error = new Error('Course not found'); error.status = 404; throw error
        }
        if (course.price !== 0) {
            const error = new Error('This course requires payment'); error.status = 400; throw error
        }
        const key = { userId: userId(req), courseId }
        await tx.enrollment.upsert({ where: { userId_courseId: key }, create: key, update: {} })
        await tx.courseProgress.upsert({ where: { userId_courseId: key }, create: key, update: {} })
    }, { isolationLevel: 'Serializable' })
    res.json({ success: true, message: 'You are enrolled in this free course' })
})
module.exports = { enrollFreeCourse, createCourse, editCourse, getCourseDetails, getFullCourseDetails, showAllCourses, getInstructorCourses, deleteCourses }

const { prisma } = require('../config/database')
const { apiData, publicUserSelect } = require('../utils/apiData')
const { handle, fail, userId } = require('../utils/http')
const include = { user: { select: publicUserSelect }, course: { select: { id: true, courseName: true } } }

const createRating = handle(async (req, res) => {
    const { review, courseId } = req.body
    const rating = Number(req.body.rating)
    if (!courseId || !review || !Number.isInteger(rating) || rating < 1 || rating > 5) return fail(res, 400, 'A course, review and rating from 1 to 5 are required')
    const key = { userId: userId(req), courseId }
    if (!await prisma.enrollment.findUnique({ where: { userId_courseId: key } })) return fail(res, 403, 'Student is not enrolled in the course')
    if (await prisma.ratingAndReview.findUnique({ where: { userId_courseId: key } })) return fail(res, 403, 'Course is already reviewed by the user')
    await prisma.ratingAndReview.create({ data: { ...key, rating, review } })
    res.json({ success: true, message: 'Rating and Review Created successfully' })
})
const getAverageRating = handle(async (req, res) => {
    const courseId = req.query.courseId || req.body.courseId
    if (!courseId) return fail(res, 400, 'Course ID is required')
    const result = await prisma.ratingAndReview.aggregate({ where: { courseId }, _avg: { rating: true } })
    res.json({ success: true, averageRating: result._avg.rating || 0 })
})
const getAllRatingAndReview = handle(async (req, res) => {
    const reviews = await prisma.ratingAndReview.findMany({ include, orderBy: { rating: 'desc' } })
    res.json({ success: true, message: 'All reviews fetched successfully', data: apiData(reviews) })
})
const getCourseRatingandReview = handle(async (req, res) => {
    const courseId = req.params.id || req.body.courseId
    if (!courseId) return fail(res, 400, 'Course ID is required')
    const reviews = await prisma.ratingAndReview.findMany({ where: { courseId }, include })
    res.json({ success: true, data: { ratingAndReview: apiData(reviews) } })
})
module.exports = { createRating, getAverageRating, getAllRatingAndReview, getCourseRatingandReview }

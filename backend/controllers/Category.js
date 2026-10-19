const { prisma } = require('../config/database')
const { apiData, publicCourseInclude } = require('../utils/apiData')
const { handle, fail } = require('../utils/http')

const createCategory = handle(async (req, res) => {
    const { name, description } = req.body
    if (!name?.trim()) return fail(res, 400, 'Category name is required')
    await prisma.category.create({ data: { name: name.trim(), description } })
    res.json({ success: true, message: 'Category created Successfully' })
})
const showAllCategory = handle(async (req, res) => {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' }, include: { course: { where: { status: 'Published' }, select: { id: true } } } })
    res.json({ success: true, message: 'All categories returned successfully', allCategory: apiData(categories) })
})
const categoryPageDetails = handle(async (req, res) => {
    const { categoryId } = req.body
    if (!categoryId) return fail(res, 400, 'Category ID is required')
    const categories = await prisma.category.findMany({
        include: { course: { where: { status: 'Published' }, include: publicCourseInclude, orderBy: { createdAt: 'desc' } } },
    })
    const selectedCategory = categories.find(c => c.id === categoryId)
    if (!selectedCategory) return fail(res, 404, 'Category not found')
    const others = categories.filter(c => c.id !== categoryId)
    const differentCategory = others[Math.floor(Math.random() * others.length)] || null
    const mostSellingCourses = categories.flatMap(c => c.course)
        .sort((a, b) => b.enrollments.length - a.enrollments.length).slice(0, 10)
    res.json({ success: true, data: apiData({ selectedCategory, differentCategory, mostSellingCourses }) })
})
module.exports = { createCategory, showAllCategory, categoryPageDetails }

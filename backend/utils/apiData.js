// Preserve the public JSON contract used by the React client.
// Explicit selects prevent credentials from appearing in nested user responses.
const publicUserSelect = {
    id: true, firstName: true, lastName: true,
    image: true, accountType: true,
    additionalDetails: { select: { about: true, profession: true } },
}
const contentInclude = {
    courseContent: {
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        include: { subSection: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } },
    },
}
const courseInclude = {
    ...contentInclude,
    instructor: { select: publicUserSelect },
    Category: true,
    ratingAndReviews: { include: { user: { select: publicUserSelect } } },
    enrollments: { select: { userId: true } },
}
const publicCourseInclude = {
    ...courseInclude,
    courseContent: {
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        include: {
            subSection: {
                orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
                select: { id: true, title: true, description: true, timeDuration: true, sectionId: true },
            },
        },
    },
}
const userInclude = {
    additionalDetails: true,
    educatorApplication: true,
    teachingCourses: { include: courseInclude },
    enrollments: { include: { course: { include: courseInclude } } },
    courseProgress: { include: { completedVideo: true } },
}

function apiData(value) {
    if (value === null || value === undefined || value instanceof Date) return value
    if (Array.isArray(value)) return value.map(apiData)
    if (typeof value !== 'object') return value
    const result = {}
    for (const [key, item] of Object.entries(value)) {
        if (['password', 'token', 'resetPasswordExpires', 'enrollments', 'teachingCourses'].includes(key)) continue
        result[key === 'id' ? '_id' : key] = apiData(item)
    }
    if (value.instructorId && !('instructor' in value)) result.instructor = value.instructorId
    if (value.categoryId && !('Category' in value)) result.Category = value.categoryId
    if (value.accountType) {
        const courses = [...(value.teachingCourses || []), ...(value.enrollments || []).map(e => e.course)]
        if (value.teachingCourses || value.enrollments) {
            result.courses = apiData([...new Map(courses.map(c => [c.id, c])).values()])
        }
    } else if (value.enrollments) {
        result.studentsEnrolled = value.enrollments.map(e => e.userId)
    }
    if (Array.isArray(value.completedVideo)) {
        result.completedVideo = value.completedVideo.map(v => v.subSectionId)
    }
    return result
}

module.exports = { apiData, publicUserSelect, contentInclude, courseInclude, publicCourseInclude, userInclude }

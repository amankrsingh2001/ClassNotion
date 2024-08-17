const zod = require('zod')

const optValidate = zod.object({
    email:zod.string().email(),
})

const signUpValidation = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string.email(),
    password:zod.string.max(20).min(5),
    image:zod.string().optional(),
    courses:zod.array[z.object({})].optional(),
    courseProgress:zod.array[z.object({})].optional(),
    accountType:zod.enum(['Admin',"Student","Instructor"])
})

const loginValidation = zod.object({
    email:zod.string().semail(),
    password:zod.string().min(5).max(20)
})

const changePasswordValidation = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5).max(20),
    newPassword:zod.string().min(5).max(20),
    confirmNewPassword:zod.string().min(5).max(20)
})

const createTagValidation = zod.object({
    name:zod.string(),
    description:zod.string()
})

const courseValidation = zod.object({
    courseName:zod.string(),
    courseDescription:zod.string(),
    whatYouWillLearn:zod.string(),
    ratingAndReviews:zod.array[zod.object()].optional(),
    price:zod.number(),
    thumbnail:zod.string().optional(),
    studentEnrolled:zod.array[zod.object()].optional()
})

module.exports = {
    optValidate,
    signUpValidation,
    loginValidation,
    changePasswordValidation,
    createTagValidation,
    courseValidation
}
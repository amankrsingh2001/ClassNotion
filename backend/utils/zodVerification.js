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

module.exports = {
    optValidate,
    signUpValidation
}
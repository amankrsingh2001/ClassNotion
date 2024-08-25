const zod = require('zod')

const optValidate = zod.object({
    email:zod.string().email(),
})

const signUpValidation = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string().email(),
    password:zod.string().max(20).min(5),
    confirmPassword:zod.string().max(20).min(5),
    accountType:zod.enum(['Admin',"Student","Instructor"]),
    contactNumber:zod.string(),
    otp: zod.string()
})

const loginValidation = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5).max(20)
})

const changePasswordValidation = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5).max(20).optional(),
    newPassword:zod.string().min(5).max(20).optional(),
    confirmNewPassword:zod.string().min(5).max(20).optional()
})

const createCategoryValidation = zod.object({
    title:zod.string(),
    description:zod.string()
})

const courseValidation = zod.object({
    courseName:zod.string(),
    courseDescription:zod.string(),
    whatYouWillLearn:zod.string(),
    price:zod.string(),
    thumbnail:zod.string().optional(),
    studentEnrolled:zod.array(zod.object()).optional()
})

const sectionValidation = zod.object({
    sectionName:zod.string(),

})

const subSectionValidation = zod.object({
    title:zod.string(),
    description:zod.string(),
    timeDuration:zod.string(),
})


module.exports = {
    optValidate,
    signUpValidation,
    loginValidation,
    changePasswordValidation,
    createCategoryValidation,
    courseValidation,
    sectionValidation,
    subSectionValidation,
}



const { prisma } = require('../config/database')
const otpGenerator = require('otp-generator')
const { optValidate, signUpValidation, loginValidation, changePasswordValidation } = require('../utils/zodVerification')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { mailSender } = require('../utils/mailSender')
const otpTemplate = require('../mail/templates/emailVerification')
const { apiData, userInclude } = require('../utils/apiData')
const { handle, fail, userId } = require('../utils/http')

const signUp = handle(async (req, res) => {
    const parsed = signUpValidation.safeParse(req.body)
    if (!parsed.success) return fail(res, 400, 'Please enter valid Credentials')
    const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = parsed.data
    if (password !== confirmPassword) return fail(res, 400, 'Password and Confirm Password do not match')
    if (await prisma.user.findUnique({ where: { email } })) return fail(res, 400, 'User already exists')
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.$transaction(async tx => {
        const recentOtp = await tx.otp.findFirst({
            where: { email, expiresAt: { gt: new Date() } }, orderBy: { createdAt: 'desc' },
        })
        if (!recentOtp || recentOtp.otp !== otp) {
            const error = new Error('Invalid or expired OTP'); error.status = 400; throw error
        }
        // Delete exactly the consumed token; concurrent signup cannot reuse it.
        await tx.otp.delete({ where: { id: recentOtp.id } })
        const result = await tx.user.create({
            data: {
                firstName, lastName, email, password: passwordHash, accountType, contactNumber,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName + ' ' + lastName)}`,
                additionalDetails: { create: { gender: '', dateOfBirth: '', about: '', contactNumber: '' } },
            }, include: userInclude,
        })
        await tx.otp.deleteMany({ where: { email } })
        return result
    })
    res.json({ success: true, message: 'User created', user: apiData(user) })
})

const login = handle(async (req, res) => {
    if (!loginValidation.safeParse(req.body).success) return fail(res, 400, 'Invalid Credentials')
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email }, include: userInclude })
    if (!user || !await bcrypt.compare(password, user.password)) return fail(res, 401, 'Password or Email is not valid')
    const token = jwt.sign({ email: user.email, id: user.id, accountType: user.accountType }, process.env.JWT_SECRET, { expiresIn: '2h' })
    res.cookie('token', token, { expires: new Date(Date.now() + 3 * 86400000), httpOnly: true, secure: true })
        .json({ success: true, user: apiData(user), token, message: 'Logged in successfully' })
})

const sendOtp = handle(async (req, res) => {
    if (!optValidate.safeParse(req.body).success) return fail(res, 400, 'Please enter valid credentials')
    const { email } = req.body
    if (await prisma.user.findUnique({ where: { email } })) return fail(res, 401, 'User already registered')
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
    await prisma.otp.deleteMany({ where: { expiresAt: { lte: new Date() } } })
    const record = await prisma.otp.create({ data: { email, otp, expiresAt: new Date(Date.now() + 5 * 60000) } })
    try {
        await mailSender(email, 'Verification email from Class Notion', otpTemplate(otp))
    } catch (error) {
        await prisma.otp.delete({ where: { id: record.id } })
        throw error
    }
    res.json({ success: true, message: 'Otp sent successfully' })
})

const changePassword = handle(async (req, res) => {
    if (!changePasswordValidation.safeParse(req.body).success || !req.body.password || !req.body.newPassword) return fail(res, 400, 'Invalid credentials')
    const user = await prisma.user.findUnique({ where: { id: userId(req) } })
    if (!user || !await bcrypt.compare(req.body.password, user.password)) return fail(res, 401, 'Invalid credentials')
    await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(req.body.newPassword, 10) } })
    await mailSender(user.email, 'Reset Password', `Password updated successfully for ${user.firstName} ${user.lastName}`)
    res.json({ success: true, message: 'Password updated successfully' })
})
module.exports = { signUp, login, sendOtp, changePassword }

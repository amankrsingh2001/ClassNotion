const { prisma } = require('../config/database')
const { mailSender } = require('../utils/mailSender')
const { handle, fail } = require('../utils/http')
const crypto = require('node:crypto')
const bcrypt = require('bcrypt')

const resetPasswordToken = handle(async (req, res) => {
    const { email } = req.body
    if (!email) return fail(res, 400, 'Email is required')
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return fail(res, 400, 'Your email is not registered')
    const token = crypto.randomUUID()
    await prisma.user.update({ where: { id: user.id }, data: { token, resetPasswordExpires: new Date(Date.now() + 5 * 60000) } })
    const origin = process.env.FRONTEND_URL || 'https://class-notion.vercel.app'
    await mailSender(email, 'Password Reset Link', `Password Reset Link ${origin}/update-password/${token}`)
    res.json({ success: true, message: 'Email sent successfully, please check your email' })
})
const resetPassword = handle(async (req, res) => {
    const { password, confirmPassword, token } = req.body
    if (typeof password !== 'string' || password.length < 5 || password.length > 20 || password !== confirmPassword || !token) return fail(res, 400, 'Invalid password or token')
    const result = await prisma.user.updateMany({
        where: { token, resetPasswordExpires: { gt: new Date() } },
        data: { password: await bcrypt.hash(password, 10), token: null, resetPasswordExpires: null },
    })
    if (!result.count) return fail(res, 400, 'Invalid or expired token')
    res.json({ success: true, message: 'Password Reset Successfully' })
})
module.exports = { resetPasswordToken, resetPassword }

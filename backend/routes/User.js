const express = require('express')
const { login, signUp, sendOtp, changePassword } = require('../controllers/Auth')
const { auth } = require('../middlewares/auth.middleware')
const { resetPassword, resetPasswordToken } = require('../controllers/ResetPassword')
const router = express.Router()

router.post('/login', login)

router.post('/signup', signUp)

router.post('/sendotp', sendOtp)

router.post('/changepassword', auth, changePassword)

//Reset password

router.post('/reset-password-token', resetPasswordToken)

router.post('/reset-password', resetPassword)

module.exports = router
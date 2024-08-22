const express = require('express')
const router = express.Router()
const { auth, isStudent } = require('../middlewares/auth.middleware')
const { capturePayment, verifySignature } = require('../controllers/Payment')


router.post('/capturePayment', auth, isStudent, capturePayment)
router.post('/verifySignature', verifySignature)

module.exports = router
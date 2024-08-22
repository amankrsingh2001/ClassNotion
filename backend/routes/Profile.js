const express = require('express')
const { deleteAccount, updateProfile, getUserDetails, getEnrolledCourse, updateDisplayPicture } = require('../controllers/Profile')
const { auth } = require('../middlewares/auth.middleware')
const router = express.Router()


router.delete("/deleteProfile", deleteAccount)

router.put('/updateProfile', auth, updateProfile)

router.get('/getUserDetails', auth, getUserDetails)

router.get('/getEnrolledCourses', auth, getEnrolledCourse)

router.put('/updateDisplayPicture', auth, updateDisplayPicture)

module.exports = router
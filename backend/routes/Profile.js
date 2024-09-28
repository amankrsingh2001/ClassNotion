const express = require('express')
const { deleteAccount, updateProfile, getUserDetails, getEnrolledCourse, updateDisplayPicture, instructorDashboard } = require('../controllers/Profile')
const { auth, isInstructor } = require('../middlewares/auth.middleware')
const router = express.Router()


router.delete("/deleteProfile",auth ,deleteAccount)

router.put('/updateProfile', auth, updateProfile)

router.get('/getUserDetails', auth, getUserDetails)

router.get('/getEnrolledCourses', auth, getEnrolledCourse)

router.put('/updateDisplayPicture', auth, updateDisplayPicture)

router.get('/getInstructorData', auth , isInstructor, instructorDashboard)

module.exports = router
const express = require('express');
const { createCourse, showAllCourses, getcourseDetail } = require('../controllers/Course');
const { auth, isInstructor, isAdmin, isStudent } = require('../middlewares/auth.middleware');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { updateSubSection, deleteSubSection, createSubSection } = require('../controllers/SubSection');
const { createCategory, showAllCategory, categoryPageDetails } = require('../controllers/Category');
const { createRating, getAverageRating, getAllRatingAndReview, getCourseRatingandReview } = require('../controllers/RatingAndReview');
const router = express.Router();

router.post('/createCourse', auth, isInstructor, createCourse)

//section

router.post('/addSection', auth, isInstructor, createSection)


router.post('/updateSection', auth, isInstructor, updateSection)

router.post('/deleteSection', auth, isInstructor, deleteSection)

router.post('/updateSubSection', auth, isInstructor, updateSubSection)

router.post('/deleteSubSection', auth, isInstructor, deleteSubSection)

router.post('/addSubSection', auth, isInstructor, createSubSection)

router.get('/getAllCourses', showAllCourses)

router.post('/getCoursesDetails', getcourseDetail)

// Category router (only by Admin)

router.post('/createCategory', auth, isAdmin, createCategory)

router.get('/showAllCategories', showAllCategory)

router.post('/getCategoryPageDetails', categoryPageDetails)

// rating and Review

router.post('/createRating', auth, isStudent, createRating)

router.get('/getAverageRating', getAverageRating)

router.get('/getReviews', getAllRatingAndReview)

router.get('/courseReviews/:id', getCourseRatingandReview)

module.exports = router
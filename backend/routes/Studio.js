const router = require('express').Router()
const { auth, isAdmin } = require('../middlewares/auth.middleware')
const { ownApplication, submitApplication, listApplications, reviewApplication } = require('../controllers/EducatorApplication')
router.use(auth)
router.get('/application', ownApplication)
router.post('/application', submitApplication)
router.get('/applications', isAdmin, listApplications)
router.post('/applications/:applicationId/review', isAdmin, reviewApplication)
module.exports = router

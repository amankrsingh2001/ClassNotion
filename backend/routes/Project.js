const router = require('express').Router({ mergeParams: true })
const { auth, isInstructor, isApprovedEducator } = require('../middlewares/auth.middleware')
const { getFolders, addFolder, assignLesson, deleteFolder } = require('../controllers/CourseProject')
router.use(auth)
router.get('/', getFolders)
router.post('/', isInstructor, isApprovedEducator, addFolder)
router.put('/lessons/:lessonId', isInstructor, isApprovedEducator, assignLesson)
router.delete('/:folderId', isInstructor, isApprovedEducator, deleteFolder)
module.exports = router

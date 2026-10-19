const router = require('express').Router()
const { listEducators, getEducator } = require('../controllers/Educator')
router.get('/', listEducators)
router.get('/:educatorId', getEducator)
module.exports = router

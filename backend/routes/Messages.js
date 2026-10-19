const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { startConversation, listConversations, getMessages, sendMessage } = require('../controllers/Messages')
router.use(auth)
router.get('/', listConversations)
router.post('/', startConversation)
router.get('/:threadId', getMessages)
router.post('/:threadId', sendMessage)
module.exports = router

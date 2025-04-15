const express = require('express')
const router = express.Router()
const { getCurrentUser, updateCurrentUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

router.get('/me', auth, getCurrentUser)

router.put('/me', auth, updateCurrentUser)

module.exports = router
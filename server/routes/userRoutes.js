const express = require('express')
const router = express.Router()
const { getCurrentUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

router.get('/me', auth, getCurrentUser)

module.exports = router
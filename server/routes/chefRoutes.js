const express = require('express')
const router = express.Router()
const chefController = require('../controllers/chefController')
const auth = require('../middleware/authMiddleware')

router.get('/', auth, chefController.getPaginatedChefs)

router.post('/', auth, chefController.addChef)

module.exports = router
const express = require('express')
const router = express.Router()
const { searchRecipes } = require('../controllers/searchRecipeController')
const auth = require('../middleware/authMiddleware')

router.post('/', auth, searchRecipes)

module.exports = router
const express = require('express')
const router = express.Router()
const { searchRecipes } = require('../controllers/searchRecipeController')

router.post('/', searchRecipes)

module.exports = router
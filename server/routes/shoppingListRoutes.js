const express = require('express')
const router = express.Router()
const shoppingListController = require('../controllers/shoppingListController')
const auth = require('../middleware/authMiddleware')

router.get('/', auth, shoppingListController.getAllShoppingLists)

router.get('/:id', auth, shoppingListController.getShoppingListById)

router.post('/', auth, shoppingListController.createShoppingList)

router.put('/:id', auth, shoppingListController.updateShoppingList)

router.delete('/:id', auth, shoppingListController.deleteShoppingList)

module.exports = router
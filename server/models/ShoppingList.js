const mongoose = require('mongoose')
const IngredientSchema = require('./Ingredient')

const ShoppingListSchema = new mongoose.Schema({
  name: { type: String, default: 'My Shopping List' },
  items: [IngredientSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)
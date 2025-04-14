const mongoose = require('mongoose')
const IngredientSchema = require('./Ingredient')
const StepSchema = require('./Step')

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sourceUrl: { type: String }, // original URL, if imported
    servings: { type: Number, default: 4 },
    ingredients: [IngredientSchema],
    steps: [StepSchema],
    tags: [String],
    author: { type: String },
    image: { type: String }, // optional URL for display
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    chefName: { type: String },
    query: { type: String },
    isSavedSearch: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', RecipeSchema)
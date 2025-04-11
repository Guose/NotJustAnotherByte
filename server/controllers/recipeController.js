const Recipe = require('../models/Recipe');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.userId}).sort({ createdAt: -1 })
    res.status(200).json(recipes)
  } catch (error) {
    console.error('Get Recipes Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch recipes' })
  }
}

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.status(200).json(recipe)
  } catch (error) {
    console.error('Get Recipe By ID Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch recipe' })
  }
}

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      user: req.user.userId
    })
    res.status(201).json(recipe)
  } catch (error) {
    console.error('Create Recipe Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    res.status(200).json(recipe)
  } catch (error) {
    console.error('Update Recipe Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    res.status(200).json({ message: 'Recipe deleted successfully' })
  } catch (error) {
    console.error('Delete Recipe Error:', error.message)
    res.status(500).json({ error: 'Failed to delete recipe' })
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
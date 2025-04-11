const ShoppingList = require('../models/ShoppingList')

const getAllShoppingLists = async (req, res) => {
  try {
    const lists = await ShoppingList.find({ user: req.user.userId }).sort({ createdAt: -1 })
    res.status(200).json(lists)
  } catch (error) {
    console.error('Get Shopping Lists Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch shopping lists' })
  }
}

const getShoppingListById = async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.id)

    if (!list) {
      return res.status(404).json({ error: 'Shopping list not found' })
    }

    res.status(200).json(list)
  } catch (error) {
    console.error('Get Shopping List Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch shopping list' })
  }
}

const createShoppingList = async (req, res) => {
  try {
    const { name, items } = req.body

    const shoppingList = await ShoppingList.create({
      name: name || 'My Shopping List',
      items,
      user: req.user.userId,
    })
    
    res.status(201).json(shoppingList)
  } catch (error) {
    console.error('Error creating shopping list:', error.message)
    res.status(400).json({ message: error.message })
  }
}

const updateShoppingList = async (req, res) => {
  try {
    const { name, items } = req.body

    const updatedList = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      { name: name },
      { $push: { items: { $each: items } } },
      { new: true, runValidators: true }
    )

    if (!updatedList) {
      return res.status(404).json({ error: 'Shopping list not found' })
    }

    res.status(200).json(updatedList)
  } catch (error) {
    console.error('Error updating shopping list:', error.message)
    res.status(400).json({ error: 'Failed to update shopping list' })
  }
}

const deleteShoppingList = async (req, res) => {
  try {
    const deleted = await ShoppingList.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: 'Shopping list not found' })
    }

    res.status(200).json({ message: 'Shopping list deleted successfully' })
  } catch (error) {
    console.error('Error deleting shopping list:', error.message)
    res.status(500).json({ message: 'Failed to delete shopping list' })
  }
}

module.exports = {
  getAllShoppingLists,
  getShoppingListById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
}
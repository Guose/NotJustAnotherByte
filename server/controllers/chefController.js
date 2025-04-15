// server/controllers/chefController.js
const Chef = require('../models/Chef')

const getPaginatedChefs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10

    const total = await Chef.countDocuments()
    const chefs = await Chef
      .find()
      .skip((page - 1) * limit)
      .limit(limit)

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalChefs: total,
      chefs,
    })
  } catch (error) {
    console.error('Error fetching chefs:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
}

const addChef = async (req, res) => {
  try {
    const chef = await Chef.create({
      ...req.body,
      user: req.user.userId,
    })
    res.status(201).json(chef)
  } catch (error) {
    console.error('Create Chef Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getPaginatedChefs,
  addChef,
}

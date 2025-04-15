const User = require('../models/User')

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Get current user error:', error.message)
    res.status(500).json({ error: 'Failed to retrieve user' })
  }
}

const updateCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId
    console.log('user req.body:', req.body)
    const { name, email, phone, favoriteChefs } = req.body
    const formattedChefs = favoriteChefs.map((chef, index) => ({
      chefId: chef.chefId,
      order: index + 1 // Set the order based on the index in the array
    }))
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      email,
      phone,
      favoriteChefs: formattedChefs
    }, {
        new: true,
        runValidators: true
      }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    console.log('Updated user:', updatedUser)

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Update favorite chefs error:', error.message)
    res.status(500).json({ error: 'Failed to update favorite chefs' })
  }
}

module.exports = {
  getCurrentUser,
  updateCurrentUser,
}
const User = require('../models/User')

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Get current user error:', error.message)
    res.status(500).json({ error: 'Failed to retrieve user' })
  }
}

module.exports = {
  getCurrentUser,
}
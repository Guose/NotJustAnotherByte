const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body
    const existingUser = await User.findOne({ email })    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    const user = await User.create({ email, phone, password, name })    
    const token = generateToken(user)

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token,
    })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(user)

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed. Invalid credentials.' })
  }
}

module.exports = {
  registerUser,
  loginUser,
}
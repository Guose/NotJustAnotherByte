require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const shoppingListRoutes = require('./routes/shoppingListRoutes')

const connectDb = require('./config/db')
connectDb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/shopping-list', shoppingListRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Not Just Another Byte API.')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
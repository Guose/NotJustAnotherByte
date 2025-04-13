require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const shoppingListRoutes = require('./routes/shoppingListRoutes')
const searchRecipeRoutes = require('./routes/searchRecipeRoutes')

const connectDb = require('./config/db')
connectDb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173', // ✅ your frontend's origin
  credentials: true,               // ✅ allow cookies and headers
}))
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/shopping-list', shoppingListRoutes)
app.use('/api/v1/recipes/search', searchRecipeRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Not Just Another Byte API.')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
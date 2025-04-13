const mongoose = require('mongoose')

const ChefSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chef', ChefSchema)
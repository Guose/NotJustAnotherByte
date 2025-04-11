const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Whole number quantity (e.g., 1, 2, 3)
  quantity: {
    type: Number,
    required: false,
    min: 0
  },

  // Optional fraction (e.g., 1/4, 1/2)
  measurement: {
    type: String,
    enum: ['1/8', '1/4', '1/3', '1/2', '2/3', '3/4'],
    required: false
  },

  // Unit of measurement
  unit: {
    type: String,
    enum: [
      'g', 'kg', 'oz', 'lb', 'ml', 'l', 'tsp', 'tbsp', 'cup',
      'pint', 'quart', 'gallon', 'stalk', 'leaf',
      'bunch', 'head', 'piece', 'slice', 'clove', 'can', 'package'
    ],
    required: true
  }
});

module.exports = IngredientSchema;

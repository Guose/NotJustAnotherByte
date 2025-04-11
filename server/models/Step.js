const mongoose = require('mongoose')

const StepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  instruction: { type: String, required: true },
  durationSeconds: { type: Number },
})

module.exports = StepSchema
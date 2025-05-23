const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteChefs: [
    {
      chefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
      },
      order: {
        type: Number,
        default: 0,
      }
    }
  ]
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
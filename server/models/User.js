const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageURL: String,
  refreshToken: String
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)
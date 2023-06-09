const mongoose = require('mongoose')

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  docsURL: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Technology', TechnologySchema)
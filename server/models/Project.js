const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  links: [{ name: String, url: String }],
  tags: [{ name: String, color: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
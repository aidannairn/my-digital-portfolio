const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  links: [{ title: String, url: String }],
  tags: [{ type: String, color: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
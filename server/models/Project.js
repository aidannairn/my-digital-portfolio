const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  links: [{
    linkName: {
      type: String,
      required: true
    },
    linkURL: {
      type: String,
      required: true
    }
  }],
  tags: [{
    tagName: { type: String, required: true },
    tagColor: String
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
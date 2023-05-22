const mongoose = require('mongoose')

const WebsiteFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  demoURL: { type: String, required: true },
  bullets: [{ type: String, required: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('WebsiteFeature', WebsiteFeatureSchema)
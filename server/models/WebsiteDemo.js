const mongoose = require('mongoose')

const WebsiteDemoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  demo: { type: String, required: true },
  bullets: [{ type: String, required: true }],
  duration: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('WebDemo', WebsiteDemoSchema)
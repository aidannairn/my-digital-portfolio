const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  qualification: { type: String, required: true },
  certificateURL: String,
  logoURL: String,
  logoBgHex: String,
  dateFrom: { type: Date, required: true },
  dateTo: Date,
  bullets: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Education', EducationSchema)
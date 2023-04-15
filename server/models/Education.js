const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  qualifications: [{ type: String, required: true }],
  logoURL: String,
  logoBgHex: String,
  dateFrom: { type: Date, required: true },
  dateTo: Date,
  bullets: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Education', EducationSchema)
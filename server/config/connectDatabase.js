const mongoose = require('mongoose')

const connectDatabase = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to the database.')
}

module.exports = connectDatabase
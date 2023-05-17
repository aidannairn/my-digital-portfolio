const mongoose = require('mongoose')

const connectDatabase = async () => {
  const LOCATION = process.env.NODE_ENV === 'production' ? 'prod' : 'test'
  const URI = `${process.env.MONGO_URI + LOCATION}`
  const DB = await mongoose.connect(URI)
  console.log('Connected to the database.')
}

module.exports = connectDatabase
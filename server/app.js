const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDatabase = require('./config/connectDatabase.js')
const userRouter = require('./routes/user.routes')


const app = express()
dotenv.config()
connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use(userRouter)

// app.get('/api/test', (req, res) => res.send('Testing server route.'))

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// app.get('/api/test', (req, res) => res.send('Testing server route.'))

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
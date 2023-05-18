const serverless = require('serverless-http')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDatabase = require('./config/database.config')
const {
  aboutWebsiteRouter,
  userRouter,
  educationRouter,
  technologyRouter,
  projectRouter
} = require('./routes')

const app = express()
dotenv.config()
connectDatabase()

const origin = process.env.NODE_ENV === 'production'
? process.env.CORS_PROD_ORIGIN
: process.env.CORS_DEV_ORIGIN

app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  const corsOptions = {
    credentials: true,
    origin: origin,
    preflightContinue: true,
    optionsSuccessStatus: 204,
    methods: 'OPTIONS,DELETE,GET,HEAD,PATCH,POST,PUT',
    allowedHeaders: 'Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Trace-Id,Set-Cookie'
  }
  app.options('*', cors())
  app.use(cors(corsOptions))
} else {
  app.use(cors({ credentials: true, origin }))
}

app.use(cookieParser())
app.use(express.json())

app.get('/info', async (req, res) => {
  try {
    return res.status(200).json({
      website: process.env.CORS_PROD_ORIGIN,
      description: 'An application for web-developers to showcase their skillset.'
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      alert: {
        type: 'error',
        msg: 'There was a problem retrieving info.',
        error
      }
    })
  }
})

app.use(aboutWebsiteRouter)
app.use(userRouter)
app.use(educationRouter)
app.use(technologyRouter)
app.use(projectRouter)

if (process.env.NODE_ENV === 'production')
  module.exports.handler = serverless(app)
else
  app.listen(
    process.env.PORT, 
    () => console.log(`Listening on port ${process.env.PORT}...`)
  )
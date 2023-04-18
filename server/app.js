const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDatabase = require('./config/database.config')
const { multerImage } = require('./config/multer.config')
const { s3Upload } = require('./config/aws.config')
const {
  userRouter,
  educationRouter,
  technologyRouter,
  projectRouter
} = require('./routes')

const app = express()
dotenv.config()
connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }))
app.use(cookieParser())
app.use(express.json())

app.use(userRouter)
app.use(educationRouter)
app.use(technologyRouter)
app.use(projectRouter)

app.post('/api/image-upload', multerImage, async (req, res, next) => {
  try {
    if (req.file) {
      const imageLocation = await s3Upload(req.file.originalname, req.file.path, req.body.directory)
      console.log(imageLocation)
  
      return res.status(200).json({ type: 'success', msg: 'Image was uploaded successfully.' })
    } else { throw new Error('No file was submitted.') }

  } catch (error) {
    console.error(error)
    res.status(400).json({ type: 'error', msg: 'There was a problem while trying to upload an image.' })
  }
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
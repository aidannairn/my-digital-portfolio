const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')

const connectDatabase = require('./config/database.config')
const { storage, imageFilter } = require('./config/multer.config')
const { s3Upload } = require('./config/aws.config')
const userRouter = require('./routes/user.routes')

const app = express()
dotenv.config()
connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use(userRouter)

app.post('/api/image-upload', multer({ storage, fileFilter: imageFilter }).single('image'), async (req, res, next) => {
  try {
    const imageLocation = await s3Upload(req.file.originalname, req.file.path, req.body.directory)
    console.log(imageLocation)

    return res.status(200).json({ type: 'success', msg: 'Image was uploaded successfully.' })
  } catch (error) {
    console.error(error)
    res.status(400).json({ type: 'error', msg: 'There was a problem while trying to upload an image.' })
  }
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
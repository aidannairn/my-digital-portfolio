const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const connectDatabase = require('./config/database.config')
const userRouter = require('./routes/user.routes')
const s3 = require('./config/aws.config')


const app = express()
dotenv.config()
connectDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use(userRouter)

const storage = multer.diskStorage({
  filename: (req, file, callback) =>
    callback(null, `${Date.now()}-${file.originalname}`)
})

const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))
    return callback(new Error('Only image files are allowed!'), false)
  callback(null, true);
}

app.post('/api/image-upload', multer({ storage, fileFilter: imageFilter }).single('image'), async (req, res, next) => {
  try {
    const DIRECTORY = '/test'
    
    const uploadedImage = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME + DIRECTORY,
      Body: fs.createReadStream(req.file.path),
      Key: `${Date.now()}-${file.originalname}`
    }).promise()
  
    console.log(uploadedImage)
    return res.status(200).json({ type: 'success', msg: 'Image was uploaded successfully.' })
  } catch (error) {
    console.error(error)
    res.status(400).json({ type: 'error', msg: 'There was a problem while trying to upload an image.' })
  }
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
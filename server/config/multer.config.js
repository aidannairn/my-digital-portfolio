const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, callback) =>
    callback(null, `${Date.now()}-${file.originalname}`)
})

const imageFilter = (req, file, callback) => {
  const [type, extension] = file.mimetype.split('/')
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']

  if (type !== 'image' || !allowedExtensions.includes(extension))
    return callback(new Error('Only the following image file types can be uploaded:\n[.jpg, .jpeg, .png, .gif]'), false)
  callback(null, true);
}

const multerImage = multer({ storage, fileFilter: imageFilter }).single('image')

module.exports = { storage, imageFilter, multerImage }
const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, callback) =>
    callback(null, `${Date.now()}-${file.originalname}`)
})

const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))
    return callback(new Error('Only the following image file types can be uploaded:\n[.jpg, .jpeg, .png, .gif]'), false)
  callback(null, true);
}

const multerImage = multer({ storage, fileFilter: imageFilter }).single('image')

module.exports = { storage, imageFilter, multerImage }
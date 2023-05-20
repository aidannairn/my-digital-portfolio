const path = require('path')

const { s3UploadFile, s3DeleteFile, s3GetSignedURL } = require('../config/aws.config')
const Technology = require('../models/Technology')
const StatusCodeError = require('../utils/statusCodeError')

const techCreate = async (req, res) => {
  const { name, docsURL } = req.body
  const userId = req.userId
  const image = req.file

  if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

  if (!(name && image))
    throw new StatusCodeError(400, 'A new technology should include the name and logo.')

  try {
    var imageURL = await s3UploadFile(name + path.extname(image.originalname), image.path, 'technologies')
    
    const technology = new Technology({ name, docsURL, imageURL, userId })
    
    await technology.save()

    technology.imageURL = await s3GetSignedURL(imageURL)
    
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${name} has been added to your technologies!`
      },
      technology
    })
  } catch (error) {
    if (imageURL) s3DeleteFile(imageURL)
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not add new technology.'
      }
    })
  }
}

const techDeleteOne = async (req, res) => {
  const { id: techId } = req.params
  const userId = req.userId
  
  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')
    
    if (!techId) throw new StatusCodeError(404, 'An ID for the technology to be deleted was not provided.')

    const technology = await Technology.findOneAndDelete({ _id: techId, userId })

    if (!technology) throw new StatusCodeError(404, 'Could not find a technology that matches the technology ID and user ID.')
    
    const techImage = await s3DeleteFile(technology.imageURL)
    if (!techImage) throw new Error('Image was not removed from the cloud.')

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${technology.name} was removed successfully.`
      },
      techId: technology._id
    })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not delete technology.'
      }
    })
  }
}

module.exports = { techCreate, techDeleteOne }
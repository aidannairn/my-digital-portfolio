const path = require('path')

const { s3Upload, s3Delete } = require('../config/aws.config')
const Technology = require('../models/Technology')
const StatusCodeError = require('../utils/statusCodeError')

const techCreate = async (req, res) => {
  const { name, docsURL } = req.body
  const userId = req.userId
  const image = req.file

  if (!(name && image && userId))
    throw new StatusCodeError(400, 'Your new technology should include the name and logo.')

  try {
    var imageURL = await s3Upload(name + path.extname(image.originalname), image.path, 'technologies')
    
    const technology = new Technology({ name, docsURL, imageURL, userId })
    
    await technology.save()
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${name} has been added to your technologies!`
      },
      technology
    })
  } catch (error) {
    if (imageURL) s3Delete(imageURL)
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
    const technology = await Technology.findOneAndDelete({ _id: techId, userId })

    if (!technology) throw new StatusCodeError(404, 'Could not find a technology that matches the technology ID and user ID.')
    
    const techImage = await s3Delete(technology.imageURL)
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
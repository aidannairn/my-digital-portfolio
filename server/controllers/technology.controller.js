const path = require('path')

const { s3Upload, s3Delete } = require('../config/aws.config')
const Technology = require('../models/Technology')

const techCreate = async (req, res) => {
  const { name, docsURL } = req.body
  const userId = req.userId
  const image = req.file

  if (!(name && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Your new technology should include the name and logo.'})

  try {
    var imageURL = await s3Upload(name + path.extname(image.originalname), image.path, 'technologies')
    
    const technology = new Technology({ name, docsURL, imageURL, userId })
    
    await technology.save()
    return res.status(200).json({ type: 'success', msg: `${name} has been added to your technologies!`, technology })
  } catch (error) {
    if (imageURL) s3Delete(imageURL)
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new technology.' })
  }
}

const techDeleteOne = async (req, res) => {
  const { id: techId } = req.params
  const userId = req.userId
  
  try {
    const technology = await Technology.findOneAndDelete({ _id: techId, userId })

    if (!technology) throw new Error('Could not find a technology that matches the technology ID and user ID.')
    
    const techImage = await s3Delete(technology.imageURL)
    if (!techImage) throw new Error('Image was not removed from S3.')

    return res.status(200).json({ type: 'success', msg: `${technology.name} was removed successfully.`, id: technology._id })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete technology.' })
  }
}

module.exports = { techCreate, techDeleteOne }
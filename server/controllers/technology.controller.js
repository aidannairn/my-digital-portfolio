const path = require('path')

const { s3Upload, s3Delete } = require('../config/aws.config')
const Technology = require('../models/Technology')

const techCreate = async (req, res, next) => {
  const { name, docsURL, userId } = req.body
  const image = req.file

  if (!(name && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Your new technology should include the name and logo.'})

  try {
    const imageURL = await s3Upload(name + path.extname(image.originalname), image.path, 'technologies')
    const technology = new Technology({ name, docsURL, imageURL, userId })
    technology.save()

    return res.status(200).json({ type: 'success', msg: `${name} has been added to your technologies!`})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new technology.' })
  }
}

const techDeleteOne = async (req, res) => {
  const { id: techId } = req.params

  // TODO: Get user ID and validate that the technology to be deleted belongs to the active user.

  try {
    const technology = await Technology.findByIdAndDelete(techId)
    if (!technology) throw new Error(`There was a problem removing ${technology.name} from the database.`)
    
    const techImage = await s3Delete(technology.imageURL)
    if (!techImage) throw new Error('Image was not removed from S3.')

    return res.status(200).json({ type: 'success', msg: `${technology.name} was removed successfully.` })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete technology.' })
  }
}

module.exports = { techCreate, techDeleteOne }
const path = require('path')

const { s3Upload, s3Delete } = require('../config/aws.config')
const Technology = require('../models/Technology')

const techCreate = async (req, res, next) => {
  const { name, docsURL, directory, userId } = req.body
  const image = req.file

  if (!(name && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.'})

  try {
    const imageURL = await s3Upload(name + path.extname(image.originalname), image.path, directory)
    const newTechnology = new Technology({ name, docsURL, imageURL, userId })
    newTechnology.save()

    return res.status(200).json({ type: 'success', msg: `${name} has been added to your technologies!`})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new technology.' })
  }
}

const techDeleteOne = async (req, res) => {
  const { id: techId } = req.params

  try {
    const technology = await Technology.findByIdAndDelete(techId)
    if (!technology) throw new Error(`There was a problem removing ${technology.name} from the database.`)
    
    const techImage = await s3Delete(technology.imageURL)
    if (!techImage) throw new Error('Image was not removed from S3.')

    return res.status(200).json({ type: 'success', msg: `${technology.name} was removed successfully.`})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete technology.' })
  }
}

module.exports = { techCreate, techDeleteOne }
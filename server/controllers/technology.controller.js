const { s3Upload } = require('../config/aws.config')
const Technology = require('../models/Technology')

const techCreate = async (req, res, next) => {
  const { name, docsURL, directory, userId } = req.body
  const image = req.file

  if (!(name && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.'})

  try {
    const imageURL = await s3Upload(name, image.path, directory)
    const newTechnology = new Technology({ name, docsURL, imageURL, userId })
    newTechnology.save()

    return res.status(200).json({ type: 'success', msg: `${name} has been added to your technologies!`})
  } catch (error) {
    console.error(error)
    return res.status(401).json({ type: 'error', msg: 'Could not add new technology.' })
  }
}

const techDeleteOne = async (req, res) => {}

module.exports = { techCreate }
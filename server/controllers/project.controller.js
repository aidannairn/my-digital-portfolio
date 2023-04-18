const { s3Upload } = require('../config/aws.config')
const Project = require('../models/Project')

const projectCreate = async (req, res, next) => {
  const { name, links, tags, userId } = req.body
  const image = req.file

  if (!(name && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Your new project should include a name and image.' })

  try {
    const imageURL = await s3Upload(image.originalname, image.path, 'projects')
    const project = new Project({ name, links, tags, imageURL, userId })
    project.save()

    return res.status(200).json({ type: 'success', msg: 'You have added a new project!'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new project.' })
  }
}

module.exports = { projectCreate }
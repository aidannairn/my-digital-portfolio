const { s3Upload, s3Delete } = require('../config/aws.config')
const Project = require('../models/Project')

const projectCreate = async (req, res) => {
  const { name, description, projectLinks, projectTags } = req.body
  const userId = req.userId
  const image = req.file

  if (!(name && description && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Your new project should include a name and image.' })
    
  try {
    const links = await JSON.parse(projectLinks)
    const tags = await JSON.parse(projectTags)

    var imageURL = await s3Upload(image.originalname, image.path, 'projects')

    const project = new Project({ name, description, links, tags, imageURL, userId })

    await project.save()
    return res.status(200).json({ type: 'success', msg: 'You have added a new project!', project })
  } catch (error) {
    if (imageURL) s3Delete(imageURL)
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new project.' })
  }
}

const projectDeleteOne = async (req, res) => {
  const { id: projectId } = req.params
  const userId = req.userId

  try {
    const project = await Project.findOneAndDelete({ _id: projectId, userId })

    if (!project) throw new Error('Could not find a project that matches the project ID and user ID.')
    
    const projectImage = await s3Delete(project.imageURL)
    if (!projectImage) throw new Error('Image was not removed from S3.')

    return res.status(200).json({ type: 'success', msg: 'Project was removed successfully.', id: project._id })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete project.' })
  }
}

module.exports = { projectCreate, projectDeleteOne }
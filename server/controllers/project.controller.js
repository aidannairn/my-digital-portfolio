const { s3Upload, s3Delete } = require('../config/aws.config')
const Project = require('../models/Project')

const projectCreate = async (req, res, next) => {
  const { name, description, projectLinks, projectTags, userId } = req.body
  const image = req.file

  if (!(name && description && image && userId))
    return res.status(400).json({ type: 'error', msg: 'Your new project should include a name and image.' })
    
  try {
    const links = JSON.parse(projectLinks).map(link => ({
      name: link.linkName,
      url: link.linkURL
    }))
  
    const tags = JSON.parse(projectTags).map(tag => ({
      name: tag.tagName,
      color: tag.tagColor
    }))

    const imageURL = await s3Upload(image.originalname, image.path, 'projects')

    const project = new Project({ name, description, links, tags, imageURL, userId })
    project.save()

    return res.status(200).json({ type: 'success', msg: 'You have added a new project!'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new project.' })
  }
}

const projectDeleteOne = async (req, res) => {
  const { id: projectId } = req.params

  // TODO: Get user ID and validate that the project to be deleted belongs to the active user.

  try {
    const project = await Project.findByIdAndDelete(projectId)
    if (!project) throw new Error(`There was a problem removing ${project.name} from the database.`)
    
    const projectImage = await s3Delete(project.imageURL)
    if (!projectImage) throw new Error('Image was not removed from S3.')

    return res.status(200).json({ type: 'success', msg: 'Project was removed successfully.' })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete project.' })
  }
}

module.exports = { projectCreate, projectDeleteOne }
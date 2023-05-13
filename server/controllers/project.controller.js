const { s3Upload, s3Delete } = require('../config/aws.config')
const Project = require('../models/Project')
const StatusCodeError = require('../utils/statusCodeError')

const projectCreate = async (req, res) => {
  const { name, description, projectLinks, projectTags } = req.body
  const userId = req.userId
  const image = req.file

  if (!(name && description && image && userId)) {
    throw new StatusCodeError(400, 'Your new project should include a title, description and image.')
  }

  try {
    const links = await JSON.parse(projectLinks)
    const tags = await JSON.parse(projectTags)

    var imageURL = await s3Upload(image.originalname, image.path, 'projects')

    const project = new Project({ name, description, links, tags, imageURL, userId })

    await project.save()
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `You have added ${name} to your projects!`, 
      },
      project
    })
  } catch (error) {
    if (imageURL) s3Delete(imageURL)
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not add your new project.'
      }
    })
  }
}

const projectDeleteOne = async (req, res) => {
  const { id: projectId } = req.params
  const userId = req.userId

  try {
    if (!projectId || !userId) 
      throw new Error('There was a problem retrieving the project ID or the user ID.')

    const project = await Project.findOneAndDelete({ _id: projectId, userId })

    if (!project) throw new StatusCodeError(404, 'Could not find a project that matches the project ID and user ID.')
    
    const projectImage = await s3Delete(project.imageURL)
    if (!projectImage) throw new Error('Image was not removed from the cloud.')

    return res.status(200).json({
      alert: { 
        type: 'success',
        msg: `${project.name} was removed successfully!`
      }, 
      projectId: project._id
    })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'A problem occured while trying to remove this project.'
      }
    })
  }
}

module.exports = { projectCreate, projectDeleteOne }
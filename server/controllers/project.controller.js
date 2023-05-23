const { s3DeleteFile, s3GetSignedURL, s3UploadFile } = require('../config/aws.config')
const Project = require('../models/Project')
const StatusCodeError = require('../utils/statusCodeError')

const projectCreate = async (req, res) => {
  const { name, description, projectLinks, projectTags } = req.body
  const userId = req.userId
  const image = req.file
  
  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!(name && description && image)) {
      throw new StatusCodeError(400, 'Your new project should include a title, description and image.')
    }

    const links = await JSON.parse(projectLinks)
    const tags = await JSON.parse(projectTags)

    var imageURL = await s3UploadFile(image.originalname, image.path, 'projects')

    const project = new Project({ name, description, links, tags, imageURL, userId })

    await project.save()

    project.imageURL = await s3GetSignedURL(imageURL)

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `You have added ${name} to your projects!`, 
      },
      project
    })
  } catch (error) {
    if (imageURL) s3DeleteFile(imageURL)
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
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!projectId) 
      throw new Error('An ID for the project to be deleted was not provided.')

    const project = await Project.findOneAndDelete({ _id: projectId, userId })

    if (!project) throw new StatusCodeError(404, 'Could not find a project that matches the project ID and user ID.')
    
    const projectImage = await s3DeleteFile(project.imageURL)
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
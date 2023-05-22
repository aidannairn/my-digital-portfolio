const { s3UploadFile, s3DeleteFile, s3GetSignedURL } = require('../config/aws.config')
const WebsiteFeature = require('../models/WebsiteFeature')
const StatusCodeError = require('../utils/statusCodeError')

const getWebsiteFeatures = async (req, res) => {
  try {
    const excludedFields = ['-__v', '-createdAt', '-updatedAt']
    const websiteFeatures = await WebsiteFeature.find().select(excludedFields)
    for (let feat of websiteFeatures)
      feat.demoURL = await s3GetSignedURL(feat.demoURL)
    return res.status(200).json({ websiteFeatures })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      alert: {
        type: 'error',
        msg: 'There was a problem retrieving demos for the website showcase.',
        error
      }
    })
  }
}

const websiteFeatureCreate = async (req, res) => {
  const { title, subtitle, bullets: bulletsStr } = req.body
  const userId = req.userId
  const image = req.file
  
  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!(title && subtitle && bulletsStr.length && image ))
    throw new StatusCodeError(400, 'A new website feature block should include a title, subtitle, some key points about the website and an image demonstrating the feature')

    var demoURL = image
      ? await s3UploadFile(image.originalname, image.path, 'website_demo')
      : undefined

    const bullets = bulletsStr
      ? await JSON.parse(bulletsStr)
      : undefined

    const websiteFeature = new WebsiteFeature({
      title,
      subtitle,
      bullets,
      demoURL,
      userId
    })

    await websiteFeature.save()

    websiteFeature.demoURL = await s3GetSignedURL(demoURL)

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${title} feature block has been added!`
      },
      websiteFeature
    })

  } catch (error) {
    if (demoURL) s3DeleteFile(demoURL)
    console.error(error)
    return res.status(error?.errorCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not add new demo block.'
      }
    })
  }
}

const websiteFeatureDeleteOne = async (req, res) => {
  const { websiteFeatureId } = req.params
  const userId = req.userId

  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!websiteFeatureId) throw new StatusCodeError(404, 'An ID for the web demo block to be deleted was not provided.')

    const websiteFeature = await WebsiteFeature.findOneAndDelete({ _id: websiteFeatureId, userId })

    if (!websiteFeature) throw new StatusCodeError(404, 'Could not find a web demo block that matches the web demo ID and user ID.')

    const websiteFeatureImage = await s3DeleteFile(websiteFeature.demoURL)
    if (!websiteFeatureImage) throw new Error('Image was not removed from the cloud.')

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${websiteFeature.title} was removed successfully!`
      },
      websiteFeatureId: websiteFeature._id
    })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'A problem occured while trying to remove this website demo block.'
      }
    })
  }
}

module.exports = { getWebsiteFeatures, websiteFeatureCreate, websiteFeatureDeleteOne }
const { s3UploadFile, s3DeleteFile, s3GetSignedURL } = require('../config/aws.config')
const WebDemo = require('../models/WebsiteDemo')
const StatusCodeError = require('../utils/statusCodeError')

const webDemoCreate = async (req, res) => {
  const { title, subtitle, bullets: bulletsStr, duration, } = req.body
  const userId = req.userId
  const image = req.file
  
  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!(title && bullets.length && image ))
    throw new StatusCodeError(400, 'A new website demo block should include a title, some key points about the website and an image')

    var demoURL = image
      ? await s3UploadFile(image.originalname, image.path, 'website_demo')
      : undefined

    const bullets = bulletsStr
      ? await JSON.parse(bulletsStr)
      : undefined

    const webDemo = new WebDemo({
      title,
      subtitle,
      bullets,
      demoURL,
      duration,
      userId
    })

    await webDemo.save()

    webDemo.demoURL = await s3GetSignedURL(demoURL)

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${title} demo block has been added!`
      },
      webDemo
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

const webDemoDeleteOne = async (req, res) => {
  const { webDemoId } = req.params
  const userId = req.userId

  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!webDemoId) throw new StatusCodeError(404, 'An ID for the web demo block to be deleted was not provided.')

    const webDemo = await WebDemo.findOneAndDelete({ _id: webDemoId, userId })

    if (!webDemo) throw new StatusCodeError(404, 'Could not find a web demo block that matches the web demo ID and user ID.')

    const webDemoImage = await s3DeleteFile(webDemo.demoURL)
    if (!webDemoImage) throw new Error('Image was not removed from the cloud.')

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${webDemo.title} was removed successfully!`
      },
      webDemoId: webDemo._id
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

module.exports = { webDemoCreate, webDemoDeleteOne }
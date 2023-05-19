const { s3Upload, s3Delete } = require('../config/aws.config')
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
      ? await s3Upload(image.originalname, image.path, 'website_demo')
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
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `${title} demo block has been added!`
      },
      webDemo
    })

  } catch (error) {
    if (demoURL) s3Delete(demoURL)
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
  try {
    
  } catch (error) {
    
  }
}

module.exports = { webDemoCreate, webDemoDeleteOne }
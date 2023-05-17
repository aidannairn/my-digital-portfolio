const { s3Upload, s3Delete } = require('../config/aws.config')
const Education = require('../models/Education')
const StatusCodeError = require('../utils/statusCodeError')

const educationCreate = async (req, res) => {
  const {
    provider,
    qualification,
    logoBgHex,
    dateFrom,
    dateTo,
    bullets: bulletsStr
  } = req.body
  const userId = req.userId
  const logo = req.files?.logo?.[0]
  const certificate = req.files?.certificate?.[0]

  if (!(provider && qualification && dateFrom && userId))
    throw new StatusCodeError(400, 'One or more of the required fields was not filled out.')

  try {
    var logoURL = logo
      ? await s3Upload(logo.originalname, logo.path, 'education/logo')
      : undefined

    var certificateURL = certificate
      ? await s3Upload(certificate.originalname, certificate.path, 'education/certificate')
      : undefined

    const bullets = bulletsStr 
      ? await JSON.parse(bulletsStr)
      : undefined

    const education = new Education({
      provider,
      qualification,
      logoBgHex,
      dateFrom,
      dateTo,
      bullets,
      logoURL,
      certificateURL,
      userId
    })
    
    await education.save()
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `You have added a learning experience at ${provider}!`
      },
      experience: education
    })
  } catch (error) {
    if (logoURL) s3Delete(logoURL)
    if (certificateURL) s3Delete(certificateURL)
    console.error(error)
    return res.status(error?.errorCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not add new learning experience.'
      },
    })
  }
}

const educationDeleteOne = async (req, res) => {
  const { id: eduId } = req.params
  const userId = req.userId

  try {
    const education = await Education.findOneAndDelete({ _id: eduId, userId })

    if (!education) throw new StatusCodeError(404, 'Could not find a learning experience that matches the education ID and user ID.')

    const { logoURL, certificateURL, provider } = education
    
    if (logoURL) {
      const logo = await s3Delete(logoURL)
      if (!logo) throw new Error(`The ${provider} logo was not removed from the cloud.`)
    }

    if (certificateURL) {
      const certificate = await s3Delete(certificateURL)
      if (!certificate) throw new Error('The certificate image was not removed from the cloud.')
    }

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `A ${provider} learning experience was removed successfully.`
      },
      expId: education._id
    })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'Could not delete this learning experience.'
      }
    })
  }
}

module.exports = { educationCreate, educationDeleteOne }
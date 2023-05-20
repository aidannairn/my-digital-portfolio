const { s3UploadFile, s3DeleteFile, s3GetSignedURL } = require('../config/aws.config')
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
  
  try {
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!(provider && qualification && dateFrom))
      throw new StatusCodeError(400, 'One or more of the required fields was not filled out.')

    var logoURL = logo
      ? await s3UploadFile(logo.originalname, logo.path, 'education/logo')
      : undefined

    var certificateURL = certificate
      ? await s3UploadFile(certificate.originalname, certificate.path, 'education/certificate')
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

    if (logoURL)
      education.logoURL = await s3GetSignedURL(logoURL)
      
    if (certificateURL)
      education.certificateURL = await s3GetSignedURL(certificateURL)

    return res.status(200).json({
      alert: {
        type: 'success',
        msg: `You have added a learning experience at ${provider}!`
      },
      experience: education
    })
  } catch (error) {
    if (logoURL) s3DeleteFile(logoURL)
    if (certificateURL) s3DeleteFile(certificateURL)
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
    if (!userId) throw new StatusCodeError(401, 'The user is not authenticated to make this request.')

    if (!eduId) throw new StatusCodeError(404, 'An ID for the experience to be deleted was not provided.')

    const education = await Education.findOneAndDelete({ _id: eduId, userId })

    if (!education) throw new StatusCodeError(404, 'Could not find a learning experience that matches the education ID and user ID.')

    const { logoURL, certificateURL, provider } = education
    
    if (logoURL) {
      const logo = await s3DeleteFile(logoURL)
      if (!logo) throw new Error(`The ${provider} logo was not removed from the cloud.`)
    }

    if (certificateURL) {
      const certificate = await s3DeleteFile(certificateURL)
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
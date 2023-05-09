const { s3Upload, s3Delete } = require('../config/aws.config')
const Education = require('../models/Education')

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
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.' })

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
    return res.status(200).json({ type: 'success', msg: 'You have added more learning experience!', experience: education })
  } catch (error) {
    if (logoURL) s3Delete(logoURL)
    if (certificateURL) s3Delete(certificateURL)
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new learning experience.' })
  }
}

const educationDeleteOne = async (req, res) => {
  const { id: eduId } = req.params
  const userId = req.userId

  try {
    const education = await Education.findOneAndDelete({ _id: eduId, userId })

    if (!education) throw new Error('Could not find a learning experience that matches the education ID and user ID.')

    const { logoURL, certificateURL } = education
    
    if (logoURL) {
      const logo = await s3Delete(logoURL)
      if (!logo) throw new Error('Logo was not removed from S3.')
    }

    if (certificateURL) {
      const certificate = await s3Delete(certificateURL)
      if (!certificate) throw new Error('Certificate was not removed from S3.')
    }

    return res.status(200).json({ type: 'success', msg: 'Learning experience was removed successfully.', id: education._id })
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not delete this learning experience.' })
  }
}

module.exports = { educationCreate, educationDeleteOne }
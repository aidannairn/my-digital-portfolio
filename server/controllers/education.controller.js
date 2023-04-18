const { s3Upload } = require('../config/aws.config')
const Education = require('../models/Education')

const educationCreate = async (req, res, next) => {
  const {
    provider,
    qualification,
    logoBgHex,
    dateFrom,
    dateTo,
    bullets,
    userId
  } = req.body
  const logo = req.files?.logo[0]
  const certificate = req.files?.certificate[0]

  if (!(provider && qualification && dateFrom && userId))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.' })

  try {
    const logoURL = logo
      ? await s3Upload(logo.originalname, logo.path, 'education/logo')
      : undefined

    const certificateURL = certificate
      ? await s3Upload(certificate.originalname, certificate.path, 'education/certificate')
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
    education.save()

    return res.status(200).json({ type: 'success', msg: 'You have added more learning experience!'})
  } catch (error) {
    console.error(error)
    return res.status(400).json({ type: 'error', msg: 'Could not add new learning experience.' })
  }
}

module.exports = { educationCreate }
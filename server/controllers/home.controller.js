const { s3GetSignedURL } = require('../config/aws.config')

const getHomeAssets = async (req, res) => {
  try {
    const profileImageURL = await s3GetSignedURL('users/aidan_nairn.png')
    return res.status(200).json({ profileImageURL })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      alert: {
        type: 'error',
        msg: 'There was a problem retrieving global assets.',
        error
      }
    })
  }
}

module.exports = { getHomeAssets }
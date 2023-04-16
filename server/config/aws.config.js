const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
})

const s3Upload = async (name, path, directory) => {
  const { S3_BUCKET_NAME: bucket } = process.env
  const destination = directory ? `${bucket}/${directory}` : bucket

  const uploadedFile = await s3.upload({
    Bucket: destination,
    Body: fs.createReadStream(path),
    Key: `${Date.now()}-${name}`
  }).promise()

  return uploadedFile.Location.replace(process.env.S3_BUCKET_ROOT, '')
}

module.exports = {s3, s3Upload}
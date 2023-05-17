const AWS = require('aws-sdk')
const fs = require('fs')

const {
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
  S3_REGION: region
 } = process.env

AWS.config.update({ region })
const s3 = new AWS.S3({ accessKeyId, secretAccessKey })

const s3Upload = async (name, path, directory) => {
  try {
    const {
      S3_BUCKET_NAME: bucketName,
      S3_BUCKET_ROOT: bucketRoot
    } = process.env
    
    const destination = directory ? `${bucketName}/${directory}` : bucketName
  
    const uploadedFile = await s3.upload({
      Bucket: destination,
      Body: fs.createReadStream(path),
      /*  S3 stores " " as "+". MongoDB stores " " as "%20"
          - Use Regex to globally replace " " w/ "_".
          - Date gives filenames "uniqueness".
      */
      Key: `${Date.now()}-${name.replace(/ +/g, '_')}`
    }).promise()
  
    return uploadedFile.Location.replace(bucketRoot, '')
  } catch (error) {
    console.error(error)
  }
}

const s3Delete = async key => {
  try {
    const bucketName = process.env.S3_BUCKET_NAME
    const deletedImage = await s3.deleteObject({
      Bucket: bucketName,
      Key: key
    }).promise()
    return deletedImage
  } catch (error) {
    console.error(error)
  }
}

module.exports = {s3, s3Upload, s3Delete}
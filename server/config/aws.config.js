const { Upload } = require("@aws-sdk/lib-storage")
const { S3 } = require("@aws-sdk/client-s3")
const fs = require('fs')

const s3Upload = async (name, path, directory = '') => {
  try {
    const {
      S3_BUCKET_NAME: bucketName,
      S3_BUCKET_ROOT: bucketRoot
    } = process.env
    
    const uploadedFile = await new Upload({
      client: new S3({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
      }),
      params: {
        Bucket: bucketName,
        Body: fs.createReadStream(path),
        /*  S3 stores " " as "+". MongoDB stores " " as "%20"
            - Use Regex to globally replace " " w/ "_".
            - Date gives filenames "uniqueness".
        */
        Key: directory + `/${Date.now()}-${name.replace(/ +/g, '_')}`
      }
    }).done()
  
    return uploadedFile.Location.replace(bucketRoot, '')
  } catch (error) {
    console.error(error)
  }
}

const s3Delete = async key => {
  try {
    const bucketName = process.env.S3_BUCKET_NAME
    const deletedImage = await new S3({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      }
    }).deleteObject({
      Bucket: bucketName,
      Key: key
    })
    return deletedImage
  } catch (error) {
    console.error(error)
  }
}

module.exports = { s3Upload, s3Delete }
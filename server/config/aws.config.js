const { Upload } = require('@aws-sdk/lib-storage')
const { S3Client, DeleteObjectCommand, GetObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const fs = require('fs')

const {
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey
} = process.env

const client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const s3DeleteFile = async key => {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  return client.send(new DeleteObjectCommand(params))
}

const s3CheckFileExists = async key => {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  try {
    const command = new HeadObjectCommand(params)
    await client.send(command)
    return true
  } catch (error) {
    return false
  }
}

const s3GetSignedURL = async key => {
  const fileExists = await s3CheckFileExists(key)

  if (fileExists) {
    const params = {
      Bucket: bucketName,
      Key: key
    }

    const command = new GetObjectCommand(params)
    const seconds = 3600
    const url = await getSignedUrl(client, command, { expiresIn: seconds })
    return url
  } else {
    return null
  }
}

const s3UploadFile = async (name, filePath, s3Path = '') => {
  const key = (s3Path ? s3Path + '/' : '')
    + Date.now() + '-' + name.replace(/ +/g, '_')
    
    const params = {
      Bucket: bucketName,
      Body: fs.createReadStream(filePath),
      /*  S3 stores " " as "+". MongoDB stores " " as "%20"
          - Use Regex to globally replace " " w/ "_".
          - Date gives filenames "uniqueness".
      */
      Key: key,
    }
    
    await new Upload({ client, params }).done()
  
    return params.Key
}

module.exports = { s3DeleteFile, s3GetSignedURL, s3UploadFile  }
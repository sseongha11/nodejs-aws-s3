// @ts-check
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

// Uploads a file to S3
const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName)

  // Setting up S3 upload parameters
  const uploadParams = {
    Bucket: bucketName,
    Body: fileContent,
    Key: 'nodejs.tar.gz', // File name you want to save as in S3
  }

  // Uploading files to the bucket

  // @ts-ignore
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      throw err
    }

    console.log(`File uploaded successfully. ${data.Location}`)
  })
}

uploadFile('/home/seongha/Documents/nodejs.tar.gz')

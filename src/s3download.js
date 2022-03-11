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

// Downloads a file to S3
/**
 * @param {string} localDest
 */
const downloadFile = (localDest) => {
  // Setting up S3 download parameters
  const downloadParams = {
    Bucket: bucketName,
    Key: 'nodejs.tar.gz', // File name you want to save as in S3
  }

  const file = fs.createWriteStream(localDest)

  return new Promise((resolve, reject) => {
    s3.getObject(downloadParams)
      .createReadStream()
      .on('end', () => resolve())
      .on('error', (error) => reject(error))
      .pipe(file)
  })
}

downloadFile('/home/seongha/Documents/nodejs1.tar.gz')

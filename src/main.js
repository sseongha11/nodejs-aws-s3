// @ts-check
const { program } = require('commander')
// const { uploadFile } = require("./s3upload")

program.version('0.0.1')

program
  .command('upload')
  .description('Upload a file')
  .action(async () => {
    // await uploadFile()
    console.log('Seongha')
  })

program.parseAsync()

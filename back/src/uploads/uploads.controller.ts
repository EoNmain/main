import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import * as AWS from 'aws-sdk';
  
  const BUCKET_NAME = 'eontest-bucket';
  
  @Controller('uploads')
  export class UploadsController {
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
      AWS.config.update({
        region: 'ap-northeast-2',
        credentials: {
          accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
          secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
        },
      });
      try {
        const upload = await new AWS.S3()
          .putObject({
            Key: `${Date.now() + file.originalname}`,
            Body: file.buffer,
            Bucket: BUCKET_NAME,
          })
          .promise();
        console.log(upload);
      } catch (error) {
        console.log(error);
      }
    }
  }
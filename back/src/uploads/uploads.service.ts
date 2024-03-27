import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  private readonly BUCKET_NAME = 'eontest-bucket';

  constructor() {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const upload = await new AWS.S3()
        .putObject({
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
          Bucket: this.BUCKET_NAME,
        })
        .promise();
      //console.log(upload);
      return upload; // Upload 정보를 반환하거나 필요에 따라 다른 작업을 수행할 수 있습니다.
    } catch (error) {
      console.log(error);
      throw error; // 에러를 처리하거나 호출하는 쪽으로 에러를 전파할 수 있습니다.
    }
  }
}

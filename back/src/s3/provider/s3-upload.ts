import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { S3 } from 'aws-sdk';

import { EnvKey } from 'src/common/env.validator';

@Injectable()
export class S3Upload {
  private s3: S3;
  private tokenBlackListBucketName = 'token-blacklist-backup';

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get(EnvKey.AWS_DEFAULT_REGION),
      credentials: {
        accessKeyId: this.configService.get(EnvKey.AWS_ACCESS_KEY_ID),
        secretAccessKey: this.configService.get(EnvKey.AWS_SECRET_ACCESS_KEY),
      },
      endpoint: this.configService.get(EnvKey.AWS_HOST),
    });

    this.s3 = new S3(); // Initialize the AWS SDK S3 client
  }

  async toTokenBlacklistBackupUploadFile(filePath: string): Promise<string> {
    const fileContent = fs.readFileSync(filePath);

    const uploadParams: S3.PutObjectRequest = {
      Bucket: this.tokenBlackListBucketName,
      Key: filePath.substring(filePath.lastIndexOf('/') + 1), // Use the filename as the S3 key
      Body: fileContent,
    };

    const result = await this.s3.upload(uploadParams).promise();
    return result.Location; // Return the S3 object URL
  }
}

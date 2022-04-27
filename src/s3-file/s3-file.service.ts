import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { readFileSync } from 'fs';

@Injectable()
export class S3FileService {
  private readonly FILE_LIMIT_SIZE = 3145728;

  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadAsync(id, fileName: string, filePath: string): Promise<string> {
    const fileContents = readFileSync(filePath);
    console.log(`${this.AWS_S3_BUCKET}, ${id}-${Date.now()}-${fileName}`);
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: `${id}-${Date.now()}-test.mp3`,

      Body: fileContents,
    };
    const { Location } = await this.s3.upload(params).promise();
    console.log(Location);
    return Location;
  }
}

import { Injectable } from '@nestjs/common';
import { S3Util } from './s3.util';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUtil } from '@job-executor/util/file.util';

@Injectable()
export class S3Service {
  constructor(
    private readonly s3Util: S3Util,
    private readonly fileUtil: FileUtil,
  ) {}

  public async uploadFileToS3(
    jobId: string,
    jobType: string,
    filePath: string,
  ): Promise<void> {
    try {
      const fileStream = this.fileUtil.createFileStream(filePath);
      const uploadParams = this.s3Util.createUploadParams(
        jobId,
        jobType,
        fileStream,
      );
      const command = new PutObjectCommand(uploadParams);
      await this.s3Util.executeS3Upload(command);
    } catch (err) {
      throw new Error(`Error uploading file to S3: ${err.message}`);
    }
  }
}

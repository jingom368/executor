import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

export abstract class JobOutput {
  private fileUrl: string;
  private s3Client: S3Client;
  private readonly bucketName = 'miricanvas-industry-academic-cooperation';

  private awsAccessKeyId = process.env.aws_access_key_id;
  private awsSecretAccessKey = process.env.aws_secret_access_key;
  private awsSessionToken = process.env.aws_session_token;

  constructor() {
    this.s3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey,
        sessionToken: this.awsSessionToken,
      },
    });
  }

  public hasFile(): boolean {
    return true;
  }

  public getLocalFilePath(): string {
    return 'getLocalFilePath';
  }

  public updateFileUrl(url: string): void {
    this.fileUrl = url;
  }

  public getFileUrl(): string {
    return this.fileUrl;
  }

  private createFileStream(filePath: string): fs.ReadStream {
    return fs.createReadStream(filePath);
  }

  private createUploadParams(
    jobId: string,
    jobType: string,
    fileStream: fs.ReadStream,
  ): {
    Bucket: string;
    Key: string;
    Body: fs.ReadStream;
  } {
    return {
      Bucket: this.bucketName,
      Key: `${jobType}/${jobId}`, // 'test/' 경로에 파일 업로드
      Body: fileStream,
    };
  }

  private async executeS3Upload(command: PutObjectCommand): Promise<void> {
    await this.s3Client.send(command);
  }

  public async uploadToS3(
    jobId: string,
    jobType: string,
    filePath: string,
  ): Promise<void> {
    try {
      console.log('Uploading file to S3:', filePath);
      const fileStream = this.createFileStream(filePath);
      const uploadParams = this.createUploadParams(jobId, jobType, fileStream);
      const command = new PutObjectCommand(uploadParams);
      await this.executeS3Upload(command);
    } catch (err) {
      throw new Error(`Error uploading file to S3: ${err.message}`);
    }
  }
}
@Injectable()
export class ImageRenderingJobOutput extends JobOutput {}

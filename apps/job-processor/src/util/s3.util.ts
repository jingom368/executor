import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class S3Util {
  private s3Client: S3Client;
  private readonly bucketName = 'miricanvas-industry-academic-cooperation';
  private awsAccessKeyId: string;
  private awsSecretAccessKey: string;
  private awsSessionToken: string;

  constructor(private configService: ConfigService) {
    this.loadAwsCredentials();
    this.s3Client = this.createS3Client();
  }

  private loadAwsCredentials(): void {
    this.awsAccessKeyId = this.configService.get<string>('aws_access_key_id');
    this.awsSecretAccessKey = this.configService.get<string>(
      'aws_secret_access_key',
    );
    this.awsSessionToken = this.configService.get<string>('aws_session_token');
  }

  private createS3Client(): S3Client {
    return new S3Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey,
        sessionToken: this.awsSessionToken,
      },
    });
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
      Key: `${jobType}/${jobId}`,
      Body: fileStream,
    };
  }

  private async executeS3Upload(command: PutObjectCommand): Promise<void> {
    await this.s3Client.send(command);
  }

  public async uploadFileToS3(
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

import { S3Util } from '@job-processor/util/s3.util';
import { Inject, Injectable } from '@nestjs/common';

export abstract class JobOutput {
  private fileUrl: string;

  constructor(@Inject(S3Util) private readonly s3Util: S3Util) {
    if (!s3Util) {
      throw new Error('s3Util is not defined');
    }
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

  // public async uploadToS3(
  //   jobId: string,
  //   jobType: string,
  //   filePath: string,
  // ): Promise<void> {
  //   await this.s3Util.uploadFileToS3(jobId, jobType, filePath);
  // }
}
@Injectable()
export class ImageRenderingJobOutput extends JobOutput {}

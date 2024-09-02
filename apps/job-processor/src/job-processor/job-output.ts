import { Injectable } from '@nestjs/common';

export abstract class JobOutput {
  private fileUrl: string;

  constructor() {}

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
}
@Injectable()
export class ImageRenderingJobOutput extends JobOutput {}

@Injectable()
export class PdfRenderingJobOutput extends JobOutput {}

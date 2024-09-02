import { ImageRenderingChildJobHandler } from '@job-executor/handler/image/image-rendering.job.child.handler';
import { ChildJobHandler } from '@job-executor/handler/job/job.child.handler';
import { PdfRenderingChildJobHandler } from '@job-executor/handler/pdf/pdf-rendering.job.child.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChildJobFactory {
  constructor(
    private readonly imageRenderingChildJobHandler: ImageRenderingChildJobHandler,
    private readonly pdfRenderingChildJobHandler: PdfRenderingChildJobHandler,
  ) {}

  getJobHandler(jobType: string): ChildJobHandler {
    switch (jobType) {
      case 'IMAGE_RENDERING': {
        return this.imageRenderingChildJobHandler;
      }
      case 'PDF_RENDERING':
        return this.pdfRenderingChildJobHandler;
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

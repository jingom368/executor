import { ImageRenderingGroupJobHandler } from '@job-executor/handler/image/image-rendering.job.group.handler';
import { GroupJobHandler } from '@job-executor/handler/job/job.group.handler';
import { PdfRenderingGroupJobHandler } from '@job-executor/handler/pdf/pdf-rendering.job.group.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupJobFactory {
  constructor(
    private readonly imageRenderingChildJobHandler: ImageRenderingGroupJobHandler,
    private readonly pdfRenderingChildJobHandler: PdfRenderingGroupJobHandler,
  ) {}
  getJobHandler(jobType: string): GroupJobHandler {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return this.imageRenderingChildJobHandler;
      case 'PDF_RENDERING':
        return this.pdfRenderingChildJobHandler;
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

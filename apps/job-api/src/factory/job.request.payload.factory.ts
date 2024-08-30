import { ImageRenderingJobRequestPayload } from '@job-api/model/image/request/image-rendering.job.request';
import { BadRequestException } from '@nestjs/common';
import { JobRequestPayload } from '@job-api/model/job/request/job.request';
import { PdfRenderingJobRequestPayload } from '@job-api/model/pdf/request/pdf-rendering.job.request';

export class JobRequestPayloadFactory {
  getPayloadType(jobType: string): new () => JobRequestPayload {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return ImageRenderingJobRequestPayload;
      case 'PDF_RENDERING':
        return PdfRenderingJobRequestPayload;
      default:
        throw new BadRequestException(`Unsupported job type: ${jobType}`);
    }
  }
}

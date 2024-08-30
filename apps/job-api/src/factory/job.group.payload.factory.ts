import { Injectable } from '@nestjs/common';
import { JobType } from '../model/enum/job.type';
import { GroupJobPayload } from '../model/job/group/job.group.payload';
import { ImageRenderingGroupJobPayload } from '@job-api/model/image/group/image-rendering.job.group.payload';
import { PdfRenderingGroupJobPayload } from '@job-api/model/pdf/group/pdf-rendering.job.group.payload';
import { ImageRenderingJobRequestPayload } from '@job-api/model/image/request/image-rendering.job.request';
import { PdfRenderingJobRequestPayload } from '@job-api/model/pdf/request/pdf-rendering.job.request';
import { JobRequestPayload } from '@job-api/model/job/request/job.request';
@Injectable()
export class JobGroupPayloadFactory {
  constructor() {}

  createGroupJob(jobType: JobType, params: JobRequestPayload): GroupJobPayload {
    switch (jobType) {
      case JobType.IMAGE_RENDERING:
        return new ImageRenderingGroupJobPayload(
          jobType,
          params as ImageRenderingJobRequestPayload,
        );
      case JobType.PDF_RENDERING:
        return new PdfRenderingGroupJobPayload(
          jobType,
          params as PdfRenderingJobRequestPayload,
        );
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }

  getGroupJob(
    jobType: JobType,
  ): new (jobType: JobType, params: JobRequestPayload) => GroupJobPayload {
    switch (jobType) {
      case JobType.IMAGE_RENDERING:
        return ImageRenderingGroupJobPayload;
      case JobType.PDF_RENDERING:
        return PdfRenderingGroupJobPayload;
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JobType } from '../job-type/job/job.type';
import { GroupJobPayload } from '../job-type/queue.payload/job.group.payload/job.group.payload';
import { ImageRenderingGroupJobPayload } from '@job-api/job-type/queue.payload/job.group.payload/image-rendering.job.group.payload';
import { JobPayload } from '@job-api/job-type/job.payload/job.payload';
import { ImageRenderingJobPayload } from '@job-api/job-type/job.payload/image-rendering.job.payload';

@Injectable()
export class JobGroupFactory {
  constructor() {}

  // -> createJobInput
  // groupInput, childInput, payload 만드는 역할까지
  //
  get(jobType: JobType, params: JobPayload): GroupJobPayload {
    switch (jobType) {
      case JobType.IMAGE_RENDERING:
        return new ImageRenderingGroupJobPayload(
          params as ImageRenderingJobPayload,
        );
        break;
      // case JobType.PDF_RENDERING:
      //   jobQueue = this.pdfRenderingJobQueue;
      //   break;
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

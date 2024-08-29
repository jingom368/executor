import { JobPayload } from '@job-api/job-type/job.payload/job.payload';
import { ImageRenderingJobPayload } from '@job-api/job-type/job.payload/image-rendering.job.payload';
import { BadRequestException } from '@nestjs/common';

export class JobPayloadFactory {
  createJobRequestToPayload(jobType: string): new () => JobPayload {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return ImageRenderingJobPayload;
      // 다른 job 타입에 대한 케이스를 여기에 추가할 수 있습니다.
      default:
        throw new BadRequestException(`Unsupported job type: ${jobType}`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ImageRenderingJobQueuePayload } from '../job-type/queue.payload/image-rendering.job.queue.payload';
import { JobQueuePayload } from '../job-type/queue.payload/job.queue.payload';
import { JobType } from '../job-type/job/job.type';

@Injectable()
export class JobGroupFactory {
  get(jobType: JobType): new () => JobQueuePayload {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return ImageRenderingJobQueuePayload;
      // 다른 jobType에 대한 케이스 추가
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

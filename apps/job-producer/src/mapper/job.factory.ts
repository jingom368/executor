import { Injectable } from '@nestjs/common';
import { ImageRenderingJobQueuePayload } from '../job-type/image-rendering.job.queue.payload';
import { JobQueuePayload } from '../job-type/job.queue.payload';

@Injectable()
export class JobFactory {
  get(jobType: string): new () => JobQueuePayload {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return ImageRenderingJobQueuePayload;
      // 다른 jobType에 대한 케이스 추가
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}

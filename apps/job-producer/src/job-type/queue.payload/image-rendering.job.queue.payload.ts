import { ChildJobPayload } from './job.child.payload';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobQueuePayload } from './job.queue.payload';
import { JobQueueData } from './job.queue.data';

export class ImageRenderingJobQueuePayload implements JobQueuePayload {
  @IsString()
  public jobId: string;

  @IsString()
  public groupId: string;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobs: ChildJobPayload[];

  @IsObject()
  jobData: JobQueueData;
}

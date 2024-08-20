import { ChildJobPayload } from './job.child.payload';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobQueuePayload } from './job.queue.payload';

export class ImageRenderingJobQueuePayload implements JobQueuePayload {
  @IsString()
  public jobIdx: string;

  @IsString()
  public groupIdx: string;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobs: ChildJobPayload[];
}

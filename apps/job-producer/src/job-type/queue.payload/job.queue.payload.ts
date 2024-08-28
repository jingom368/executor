import { ChildJobPayload } from './job.child.payload';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobQueueData } from './job.queue.data';

interface JobQueuePayloadParams {
  jobId: string;
  groupId: string;
  childJobs: ChildJobPayload[];
  jobData: JobQueueData;
}

export class JobQueuePayload {
  @IsString()
  public jobId: string;

  @IsString()
  public groupId: string;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobs: ChildJobPayload[];

  @Type(() => JobQueueData)
  public jobData: JobQueueData;

  constructor(params: JobQueuePayloadParams) {
    this.jobId = params.jobId;
    this.groupId = params.groupId;
    this.childJobs = params.childJobs;
    this.jobData = params.jobData;
  }
}

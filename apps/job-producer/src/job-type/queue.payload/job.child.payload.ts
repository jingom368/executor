import { IsEnum, IsString } from 'class-validator';
import { JobType } from '../job/job.type';
import { JobQueueChildData } from './job.child.data';
import { Type } from 'class-transformer';

interface ChildJobPayloadParams {
  childJobId: string;
  childJobType: JobType;
  childJobData: JobQueueChildData;
}
export class ChildJobPayload {
  @IsString()
  childJobId: string;

  @IsEnum(JobType)
  childJobType: JobType;

  @Type(() => JobQueueChildData)
  childJobData: JobQueueChildData;

  constructor(params: ChildJobPayloadParams) {
    this.childJobId = params.childJobId;
    this.childJobType = params.childJobType;
    this.childJobData = params.childJobData;
  }
}

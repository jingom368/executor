import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobType } from '../job.type';
import { JobRequestPayload } from './job.request.payload';

export class CreateJobRequest<JobRequestPayload> {
  @IsEnum(JobType)
  public jobType: JobType;

  @ValidateNested()
  @Type(() => JobRequestPayload)
  public jobRequestPayload: JobRequestPayload;
}

import { IsEnum, ValidateNested } from 'class-validator';
import { JobType } from '../job/job.type';

export class CreateJobRequest<T> {
  @IsEnum(JobType)
  public jobType: JobType;

  @ValidateNested()
  public jobRequestPayload: T;
}

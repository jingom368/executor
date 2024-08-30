import { ChildJobPayload } from '../child/job.child.payload';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GroupJobInput } from './job.group.input';
import { JobType } from '@job-api/model/enum/job.type';

export class GroupJobPayload {
  @IsString()
  public jobId: string;

  @IsEnum(JobType)
  public jobType: JobType;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobPayloadList: ChildJobPayload[];

  @Type(() => GroupJobInput)
  public groupJobInput: GroupJobInput;

  public getJobId(): string {
    return this.jobId;
  }

  public getJobType(): JobType {
    return this.jobType;
  }

  public getChildJobPayloadList(): ChildJobPayload[] {
    return this.childJobPayloadList;
  }

  public getGroupJobInput(): GroupJobInput {
    return this.groupJobInput;
  }
}

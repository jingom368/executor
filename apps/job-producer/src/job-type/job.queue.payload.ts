import { ChildJobPayload } from './job.child.payload';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class JobQueuePayload {
  @IsString()
  public jobIdx: string;

  @IsString()
  public groupIdx: string;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobs: ChildJobPayload[];
}

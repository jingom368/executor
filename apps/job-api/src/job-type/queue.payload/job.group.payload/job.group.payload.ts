import { ChildJobPayload } from '../job.child.payload/job.child.payload';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GroupJobInput } from '../job.group.input/job.group.input';

export abstract class GroupJobPayload {
  @IsString()
  public jobId: string;

  @ValidateNested({ each: true })
  @Type(() => ChildJobPayload)
  public childJobPayloadList: ChildJobPayload[];

  @Type(() => GroupJobInput)
  public groupJobInput: GroupJobInput;

  // constructor 만들어야 하는 지.
}

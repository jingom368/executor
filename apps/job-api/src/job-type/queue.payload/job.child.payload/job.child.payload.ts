import { IsEnum, IsString } from 'class-validator';
import { JobType } from '../../job/job.type';
import { childJobInput } from '../job.child.input/job.child.input';
import { Type } from 'class-transformer';

// interface ChildJobPayloadParams {
//   childJobId: string;
//   childJobType: JobType;
//   childJobInput: childJobInput;
// }
export class ChildJobPayload {
  @IsString()
  jobId: string;

  @IsEnum(JobType)
  jobType: JobType;

  @Type(() => childJobInput)
  jobInput: childJobInput;

  // constructor(params: ChildJobPayloadParams) {
  //   this.childJobId = params.childJobId;
  //   this.childJobType = params.childJobType;
  //   this.childJobInput = params.childJobInput;
  // }
}

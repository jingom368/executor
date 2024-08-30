import { IsString } from 'class-validator';
import { ChildJobInput } from './job.child.input';
import { Type } from 'class-transformer';

interface ChildJobPayloadParams {
  jobId: string;
  jobInput: ChildJobInput;
}
export class ChildJobPayload {
  @IsString()
  public jobId: string;

  @Type(() => ChildJobInput)
  public jobInput: ChildJobInput;

  constructor(params: ChildJobPayloadParams) {
    this.jobId = params.jobId;
    this.jobInput = params.jobInput;
  }

  public getJobId(): string {
    return this.jobId;
  }

  public getJobInput(): ChildJobInput {
    return this.jobInput;
  }
}

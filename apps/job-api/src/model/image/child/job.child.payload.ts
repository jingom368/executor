import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ChildJobPayload } from '@job-api/model/job/child/job.child.payload';
import { ImageRenderingchildJobInput } from './job.child.input';

interface ChildJobPayloadParams {
  jobId: string;
  jobInput: ImageRenderingchildJobInput;
}
export class ImageRenderingChildJobPayload extends ChildJobPayload {
  @IsString()
  public jobId: string;

  @Type(() => ImageRenderingchildJobInput)
  public jobInput: ImageRenderingchildJobInput;

  constructor(params: ChildJobPayloadParams) {
    super(params);
    this.jobId = params.jobId;
    this.jobInput = params.jobInput;
  }

  public getJobId(): string {
    return this.jobId;
  }

  public getJobInput(): ImageRenderingchildJobInput {
    return this.jobInput;
  }
}

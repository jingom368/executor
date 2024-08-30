import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ChildJobPayload } from '@job-api/model/job/child/job.child.payload';
import { PdfRenderingChildJobInput } from './job.child.input';

interface ChildJobPayloadParams {
  jobId: string;
  jobInput: PdfRenderingChildJobInput;
}
export class PdfRenderingChildJobPayload extends ChildJobPayload {
  @IsString()
  public jobId: string;

  @Type(() => PdfRenderingChildJobInput)
  public jobInput: PdfRenderingChildJobInput;

  constructor(params: ChildJobPayloadParams) {
    super(params);
    this.jobId = params.jobId;
    this.jobInput = params.jobInput;
  }

  public getJobId(): string {
    return this.jobId;
  }

  public getJobInput(): PdfRenderingChildJobInput {
    return this.jobInput;
  }
}

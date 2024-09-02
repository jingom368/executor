import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobOutput } from './job-output';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class JobProcessor<
  INPUT extends object,
  OUTPUT extends JobOutput,
> {
  constructor() {}
  protected abstract processJob(job: JobPro<INPUT, OUTPUT>): Promise<OUTPUT>;

  private async getJobDetails(
    job: JobPro,
  ): Promise<{ jobId: string; jobType: string }> {
    const jobId = job.opts.jobId;
    const jobType = job.data.jobType;
    return { jobId, jobType };
  }

  private async uploadFile(job, output: OUTPUT): Promise<string> {
    const { jobId } = await this.getJobDetails(job);
    if (!output.hasFile()) {
      return '';
    }
    return `s3/${jobId}.jpg`;
  }

  public async process(job: JobPro<INPUT, OUTPUT>): Promise<OUTPUT> {
    const output: OUTPUT = await this.processJob(job);
    const uploadedFilePath = await this.uploadFile(job, output);
    output.updateFileUrl(uploadedFilePath);
    return output;
  }
}

import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobOutput } from './job-output';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

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

  private async uploadFile(jobId: string, output: OUTPUT): Promise<string> {
    if (!output.hasFile()) {
      return '';
    }
    console.log('upload 시도', output.getLocalFilePath());
    return join(__dirname, `s3/${jobId}.jpg`);
  }

  public async process(job: JobPro<INPUT, OUTPUT>): Promise<OUTPUT> {
    const output: OUTPUT = await this.processJob(job);
    const { jobId, jobType } = await this.getJobDetails(job);
    const uploadedFilePath = await this.uploadFile(jobId, output);
    // await output.uploadToS3(jobId, jobType, uploadedFilePath);
    return output;
  }
}

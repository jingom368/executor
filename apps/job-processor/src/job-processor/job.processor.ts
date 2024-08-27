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

  async getJobId(job: JobPro): Promise<string> {
    return job.opts.jobId;
  }

  async getJobType(job: JobPro): Promise<string> {
    return job.data.jobType;
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
    const jobId = await this.getJobId(job);
    const jobType = await this.getJobType(job);
    const uploadedFilePath = await this.uploadFile(jobId, output);
    await output.uploadToS3(jobId, jobType, uploadedFilePath);
    return output;
  }
}

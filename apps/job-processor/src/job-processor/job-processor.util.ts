import { Injectable } from '@nestjs/common';
import { JobPro } from '@taskforcesh/bullmq-pro';

Injectable();
export class JobUtil {
  async getJobId(job: JobPro): Promise<string> {
    return job.opts.jobId;
  }

  async getJobType(job: JobPro): Promise<string> {
    return job.data.jobType;
  }
}

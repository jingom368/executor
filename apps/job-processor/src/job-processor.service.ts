import { Injectable } from '@nestjs/common';
import { loadProcessor } from './processor-loader';
import { JobPro } from '@taskforcesh/bullmq-pro';

@Injectable()
export class JobProcessorService {
  async processJob(job: JobPro) {
    const jobProcessor = await loadProcessor(job.data.jobType);
    return await jobProcessor.process(job);
    // console.log('job.data', job.data);
  }
}

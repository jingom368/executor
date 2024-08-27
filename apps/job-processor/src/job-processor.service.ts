import { Inject, Injectable } from '@nestjs/common';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobProcessor } from './job-processor/job.processor';
import { JobType } from './module-loader/job.type';

@Injectable()
export class JobProcessorService {
  constructor(
    @Inject('ProcessorFactory')
    private readonly processorFactory: Map<JobType, JobProcessor<any, any>>,
  ) {}
  async processJob(job: JobPro) {
    // const jobProcessor = await loadProcessor(job.data.jobType);
    const jobProcessor = this.processorFactory.get(job.data.jobType);
    return await jobProcessor.process(job);
    // console.log('job.data', job.data);
  }
}

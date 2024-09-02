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
    // 1. pageId from fetching job data <- puppeteer로 줄 pageProps를 주기 위해

    // const jobProcessor = await loadProcessor(job.data.jobType);
    const jobProcessor = this.processorFactory.get(job.data.jobType);
    return await jobProcessor.process(job);
  }
}

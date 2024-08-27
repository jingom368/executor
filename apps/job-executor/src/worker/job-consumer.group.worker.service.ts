import { Module } from '@nestjs/common';
import { JobProducerRepository } from '@job-producer/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { JobPro } from '@taskforcesh/bullmq-pro';

@Module({})
export class GroupWorkerService extends BaseWorkerService {
  constructor(jobProducerRepository: JobProducerRepository) {
    super(jobProducerRepository);
  }

  protected getProcessor(): (job: JobPro) => Promise<void> {
    return this.process;
  }

  protected getQueueName(): string {
    return 'jobQueue';
  }

  protected getConcurrency(): number {
    return 5;
  }

  private async process(job: JobPro): Promise<void> {
    // job 처리 로직 작성
    // 예시:
    const data = job.data;
    console.log('Processing job with data:', data);
    return job.data;
  }
}

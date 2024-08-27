import { Module } from '@nestjs/common';
import { JobProducerRepository } from '@job-producer/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { join, resolve } from 'path';

@Module({})
export class ChildWorkerService extends BaseWorkerService {
  constructor(jobProducerRepository: JobProducerRepository) {
    super(jobProducerRepository);
  }

  protected getProcessor(): string {
    const baseDir = resolve(__dirname, '../job-processor');
    return join(baseDir, 'main.js');
  }

  protected getQueueName(): string {
    return 'IMAGE_RENDERING';
  }

  protected getConcurrency(): number {
    return 2;
  }
}

import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';
import { ChildJobFactory } from '@job-executor/factory/job.child.factory';
import { join, resolve } from 'path';

@Module({})
export abstract class ChildWorkerService extends BaseWorkerService {
  constructor(
    jobProducerRepository: JobProducerRepository,
    protected readonly childJobFactory: ChildJobFactory,
    s3Service: S3Service,
    fileUtil: FileUtil,
  ) {
    super(jobProducerRepository, s3Service, fileUtil);
  }

  protected getProcessor(): string {
    const baseDir = resolve(__dirname, '../job-processor');
    return join(baseDir, 'main.js');
  }

  protected abstract getQueueName(): string;

  protected abstract getConcurrency(): number;

  protected async onJobCompleted(job: JobPro): Promise<void> {
    const childJobHandler = this.getJobHandler(job.data.jobType);
    await childJobHandler.handleCompletion(job);
  }

  protected async onJobFailed(job: JobPro): Promise<void> {
    const childJobHandler = this.getJobHandler(job.data.jobType);
    await childJobHandler.handleFailure(job);
  }

  protected async onJobActive(job: JobPro): Promise<void> {
    const childJobHandler = this.getJobHandler(job.data.jobType);
    await childJobHandler.handleActive(job);
  }

  protected getJobHandler(jobType: string) {
    return this.childJobFactory.getJobHandler(jobType);
  }
}

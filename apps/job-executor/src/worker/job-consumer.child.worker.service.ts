import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { join, resolve } from 'path';
import { JobStatus } from 'apps/job-api/src/job-type/entity/job.status';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';

@Module({})
export class ChildWorkerService extends BaseWorkerService {
  constructor(
    jobProducerRepository: JobProducerRepository,
    s3Service: S3Service,
    fileUtil: FileUtil,
  ) {
    super(jobProducerRepository, s3Service, fileUtil);
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

  protected async onJobCompleted(job: JobPro, returnValue: any): Promise<void> {
    const parentId = job.opts.parent.id;
    const childJobId = job.opts.jobId;
    const jobType = job.data.jobType;

    const filePath = this.fileUtil.getFullPath(returnValue.fileUrl);

    await this.jobProducerRepository.updateChildJobStatus(
      parentId,
      childJobId,
      JobStatus.COMPLETED,
    );
    this.s3Service.uploadFileToS3(childJobId, jobType, filePath);
  }

  protected async onJobFailed(): Promise<void> {}

  protected onJobActive(job: JobPro): void {
    const parentId = job.opts.parent.id;
    const childJobId = job.opts.jobId;
    this.jobProducerRepository.updateChildJobStatus(
      parentId,
      childJobId,
      JobStatus.IN_PROGRESS,
    );
  }
}

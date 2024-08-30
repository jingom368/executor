import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { join, resolve } from 'path';
import { JobStatus } from '@job-api/model/enum/job.status';
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

    // returnValue
    // returnValue 타입 변환
    // factory 이용해서 jobType에 따라 변환
    // factory jobOut을 변환해주는 팩토리
    // changeUploadUrl
    // jobOutPut 클래스 설계 returnType returnValue 타입 변환만이 아니라 마무리 작업 해주는 클래스
    // 추상적으로 처리해주어야 함. 잡 타입만 던져주면 하는 마무리 클래스의 역할 -> DB, S3 핵심 데이터만 다르게
    // 템플릿 메서드 패턴.
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

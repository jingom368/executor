import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';
import { GroupJobFactory } from '@job-executor/factory/job.group.factory';

@Module({})
export class GroupWorkerService extends BaseWorkerService {
  constructor(
    jobProducerRepository: JobProducerRepository,
    s3Service: S3Service,
    fileUtil: FileUtil,
    private readonly groupJobFactory: GroupJobFactory,
  ) {
    super(jobProducerRepository, s3Service, fileUtil);
  }
  protected getProcessor(): (job: JobPro) => Promise<void> {
    return this.process;
  }

  protected getQueueName(): string {
    return 'GROUP_QUEUE';
  }

  protected getConcurrency(): number {
    return 5;
  }

  private async process(job: JobPro): Promise<void> {
    // job 처리 로직 작성
    // 예시:
    return job.data;
  }

  // protected async onJobCompleted(job: JobPro): Promise<void> {
  //   // 팩토리 템플릿 메서드 패턴 마무리 클래스 적용 Open Closed Principle
  //   // this.GroupWorkerFactory.create(job.data.jobType).!!
  //   const { zip, imgCombine } = job.data.jobData;

  //   await this.compressService.handleZip(zip, job.data);
  //   await this.mergeService.handleImgCombine(imgCombine, job.data);
  // }

  // protected async onJobFailed(): Promise<void> {}

  // protected onJobActive(): void {
  //   console.log('[Group] job active');
  // }

  protected async onJobCompleted(job: JobPro): Promise<void> {
    const groupJobHandler = this.getJobHandler(job.data.jobType);
    await groupJobHandler.handleCompletion(job);
  }

  protected async onJobFailed(job: JobPro): Promise<void> {
    const groupJobHandler = this.getJobHandler(job.data.jobType);
    await groupJobHandler.handleFailure(job);
  }

  protected async onJobActive(job: JobPro): Promise<void> {
    const groupJobHandler = this.getJobHandler(job.data.jobType);
    await groupJobHandler.handleActive(job);
  }

  private getJobHandler(jobType: string) {
    return this.groupJobFactory.getJobHandler(jobType);
  }
}

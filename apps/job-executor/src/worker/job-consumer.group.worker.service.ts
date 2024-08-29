import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { BaseWorkerService } from './job-consumer.base.worker.service';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';
import { CompressService } from '@job-executor/services/compress.service';
import { MergeService } from '@job-executor/services/merge.service';

@Module({})
export class GroupWorkerService extends BaseWorkerService {
  constructor(
    jobProducerRepository: JobProducerRepository,
    s3Service: S3Service,
    fileUtil: FileUtil,
    private readonly compressService: CompressService,
    private readonly mergeService: MergeService,
  ) {
    super(jobProducerRepository, s3Service, fileUtil);
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
    return job.data;
  }

  protected async onJobCompleted(job: JobPro): Promise<void> {
    const { zip, imgCombine } = job.data.jobData;

    await this.compressService.handleZip(zip, job.data);
    await this.mergeService.handleImgCombine(imgCombine, job.data);
  }

  protected async onJobFailed(): Promise<void> {}

  protected onJobActive(): void {
    console.log('[Group] job active');
  }
}

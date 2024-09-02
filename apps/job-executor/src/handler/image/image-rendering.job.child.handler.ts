import { ChildJobHandler } from '../job/job.child.handler';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { FileUtil } from '@job-executor/util/file.util';
import { S3Service } from '@job-executor/s3/s3.service';
import { JobProducerRepository } from '@job-api/job-producer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageRenderingChildJobHandler extends ChildJobHandler {
  constructor(
    private readonly fileUtil: FileUtil,
    private readonly s3Service: S3Service,
    jobProducerRepository: JobProducerRepository,
  ) {
    super(jobProducerRepository);
  }

  async handleCompletion(job: JobPro): Promise<void> {
    await this.updateJobStatusToCompleted(job);
    const { childJobId, jobType } = this.getJobDetails(job);
    const filePath = this.fileUtil.getFullPath(job.returnvalue.fileUrl);
    await this.s3Service.uploadFileToS3(childJobId, jobType, filePath);
  }

  async handleActive(job: JobPro): Promise<void> {
    await this.updateJobStatusToProgress(job);
  }

  async handleFailure(job: JobPro): Promise<void> {
    console.log(`Handling failure of image rendering job ${job.id}`);
  }
}

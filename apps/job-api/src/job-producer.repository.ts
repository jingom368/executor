import { Injectable } from '@nestjs/common';
import { JobEntity } from './job-type/entity/job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobEntityDocument } from './job-type/schema/job.schema';
import { JobStatus } from './job-type/entity/job.status';
import { JobRepositoryUtil } from './util/job-producer.repository.util';

@Injectable()
export class JobProducerRepository {
  constructor(
    @InjectModel(JobEntity.name) private jobModel: Model<JobEntityDocument>,
    private readonly jobRepositoryUtil: JobRepositoryUtil,
  ) {}
  async create(jobEntity: Partial<JobEntity>): Promise<void> {
    const createdJob = new this.jobModel(jobEntity);
    await createdJob.save();
  }

  async updateChildJobStatus(
    parentId: string,
    childJobId: string,
    childJobStatus: JobStatus,
  ) {
    const job = await this.jobRepositoryUtil.findJobById(parentId);
    const childJob = await this.jobRepositoryUtil.findChildJobById(
      job,
      childJobId,
    );

    childJob.childJobStatus = childJobStatus;
    job.updatedAt = new Date(); // 상태 업데이트 시 updatedAt도 갱신
    await job.save();
  }
}

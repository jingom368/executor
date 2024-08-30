import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JobEntityDocument } from '../model/job/entity/schema/job.schema';
import { JobEntity } from '../model/job/entity/job.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobRepositoryUtil {
  private readonly JOB_NOT_FOUND_ERROR = 'Job not found';
  private readonly CHILD_JOB_NOT_FOUND_ERROR = 'Child job not found';

  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntityDocument>,
  ) {}

  async findJobById(jobId: string): Promise<JobEntityDocument> {
    const job = await this.jobModel.findOne({ jobId });
    if (!job) {
      throw new Error(this.JOB_NOT_FOUND_ERROR);
    }
    return job;
  }

  async findChildJobById(job: JobEntity, childJobId: string) {
    const childJob = job.childJobs.find((cj) => cj.jobId === childJobId);
    if (!childJob) {
      throw new Error(this.CHILD_JOB_NOT_FOUND_ERROR);
    }
    return childJob;
  }
}

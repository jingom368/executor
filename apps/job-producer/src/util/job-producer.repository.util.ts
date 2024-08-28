import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JobEntityDocument } from '../job-type/schema/job.schema';
import { JobEntity } from '../job-type/entity/job.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobRepositoryUtil {
  private readonly JOB_NOT_FOUND_ERROR = 'Job not found';
  private readonly CHILD_JOB_NOT_FOUND_ERROR = 'Child job not found';

  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntityDocument>,
  ) {}

  async findJobById(jobIdx: string): Promise<JobEntityDocument> {
    const job = await this.jobModel.findOne({ jobIdx });
    if (!job) {
      throw new Error(this.JOB_NOT_FOUND_ERROR);
    }
    return job;
  }

  async findChildJobById(job: JobEntity, childJobId: string) {
    const childJob = job.childJobs.find((cj) => cj.childJobId === childJobId);
    if (!childJob) {
      throw new Error(this.CHILD_JOB_NOT_FOUND_ERROR);
    }
    return childJob;
  }
}

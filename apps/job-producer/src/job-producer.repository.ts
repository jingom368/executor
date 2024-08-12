import { Injectable } from '@nestjs/common';
import { JobEntity } from './job-type/job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobEntityDocument } from './job-type/job.schema';

@Injectable()
export class JobProducerRepository {
  constructor(
    @InjectModel(JobEntity.name) private jobModel: Model<JobEntityDocument>,
  ) {}
  async create(jobEntity: Partial<JobEntity>): Promise<void> {
    const createdJob = new this.jobModel(jobEntity);
    await createdJob.save();
  }
}

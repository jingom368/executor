import { Injectable } from '@nestjs/common';
import { JobRequestPayload } from './job-type/job.request.payload';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateJobRequest } from './job-type/job.request';
import { JobQueuePayload } from './job-type/job.queue.payload';
import { JobFactory } from './mapper/job.factory';

@Injectable()
export class JobGroupService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly jobFactory: JobFactory,
  ) {}
  async createGroupJob(
    createJobRequest: CreateJobRequest<JobRequestPayload>,
    // jobType: string,
    // jobRequestPayload: JobRequestPayload,
  ): Promise<JobQueuePayload> {
    const jobQueuePayload: JobQueuePayload = this.mapper.map(
      createJobRequest,
      CreateJobRequest,
      this.jobFactory.get(createJobRequest.jobType),
    );
    return jobQueuePayload;
  }
}

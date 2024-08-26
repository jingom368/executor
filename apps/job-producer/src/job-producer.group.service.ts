import { Injectable } from '@nestjs/common';
import { JobRequestPayload } from './job-type/request/job.request.payload';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateJobRequest } from './job-type/request/job.request';
import { JobQueuePayload } from './job-type/queue.payload/job.queue.payload';
import { JobGroupFactory } from './mapper/job.factory';

@Injectable()
export class JobGroupService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly jobGroupFactory: JobGroupFactory,
  ) {}
  createGroupJob(
    createJobRequest: CreateJobRequest<JobRequestPayload>,
    // jobType: string,
    // jobRequestPayload: JobRequestPayload,
  ): JobQueuePayload {
    const jobQueuePayload: JobQueuePayload = this.mapper.map(
      createJobRequest,
      CreateJobRequest,
      this.jobGroupFactory.get(createJobRequest.jobType),
    );
    return jobQueuePayload;
  }
}

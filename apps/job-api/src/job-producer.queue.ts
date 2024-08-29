import { Injectable } from '@nestjs/common';
import { GroupJobPayload } from './job-type/queue.payload/job.group.payload/job.group.payload';
import { InjectFlowProducer } from '@taskforcesh/nestjs-bullmq-pro';
import { FlowProducerPro } from '@taskforcesh/bullmq-pro';
import { JobProducerRepository } from './job-producer.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { JobEntity } from './job-type/entity/job.entity';

@Injectable()
export class JobQueueService {
  constructor(
    @InjectFlowProducer('flowProducerName')
    private flowProducer: FlowProducerPro,
    private readonly jobProducerRepository: JobProducerRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async addJob(jobPayload: GroupJobPayload): Promise<string> {
    // console.log('jobPayload', JSON.stringify(jobPayload, null, 2));
    // const jobEntity = this.mapper.map(jobPayload, GroupJobPayload, JobEntity);
    // console.log('jobEntity', JSON.stringify(jobEntity, null, 2));

    // DB에 저장하는 작업
    // await this.jobProducerRepository.create(jobEntity);

    // 큐에 넣는 작업
    await this.flowProducer.add({
      name: 'jobType',
      queueName: 'jobQueue',
      data: {
        idx: jobPayload.jobId,
        jobData: jobPayload.groupJobInput,
      },
      opts: { jobId: jobPayload.jobId },
      children: jobPayload.childJobPayloadList.map((childJob, index) => ({
        name: `${index + 1}`,
        data: {
          jobType: childJob.jobType,
          jobData: childJob.jobInput,
        },
        queueName: childJob.jobType,
        opts: {
          jobId: childJob.jobId,
        },
      })),
    });

    return jobPayload.jobId;
  }
}

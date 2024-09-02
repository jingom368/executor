import { Injectable } from '@nestjs/common';
import { GroupJobPayload } from './model/job/group/job.group.payload';
import { InjectFlowProducer } from '@taskforcesh/nestjs-bullmq-pro';
import { FlowProducerPro } from '@taskforcesh/bullmq-pro';
import { JobProducerRepository } from './job-producer.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { JobEntity } from './model/job/entity/job.entity';
import { JobGroupPayloadFactory } from './factory/job.group.payload.factory';

@Injectable()
export class JobQueueService {
  constructor(
    @InjectFlowProducer('flowProducerName')
    private flowProducer: FlowProducerPro,
    private readonly jobProducerRepository: JobProducerRepository,
    private jobGroupPayloadFactory: JobGroupPayloadFactory,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async addJob(jobPayload: GroupJobPayload): Promise<string> {
    const jobEntity = this.mapper.map(
      jobPayload,
      this.jobGroupPayloadFactory.getGroupJob(jobPayload.getJobType()),
      JobEntity,
    );

    // DB에 저장하는 작업
    await this.jobProducerRepository.create(jobEntity);

    // 큐에 넣는 작업
    await this.flowProducer.add({
      name: 'jobType',
      queueName: 'GROUP_QUEUE',
      data: jobPayload.getGroupJobInput(),
      opts: { jobId: jobPayload.getJobId() },
      children: jobPayload.childJobPayloadList.map((childJob, index) => ({
        name: `${index + 1}`,
        data: childJob.getJobInput(),
        queueName: childJob.getJobInput().jobType,
        opts: {
          jobId: childJob.getJobId(),
          attempts: 3,
        },
      })),
    });

    return jobPayload.jobId;
  }
}

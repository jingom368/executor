import { Injectable } from '@nestjs/common';
import { JobPayload } from './job-type/job.payload';
import { InjectFlowProducer } from '@taskforcesh/nestjs-bullmq-pro';
import { FlowProducerPro } from '@taskforcesh/bullmq-pro';
import { JobProducerRepository } from './job-producer.repository';
import { EntityMapper } from './mapper/job.entity.mapper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { JobEntity } from './job-type/job.entity';

@Injectable()
export class JobProducerService {
  constructor(
    @InjectFlowProducer('flowProducerName')
    private flowProducer: FlowProducerPro,
    private readonly jobProducerRepository: JobProducerRepository,
    private readonly entityMapper: EntityMapper,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async addJob(jobPayload: JobPayload): Promise<string> {
    // const jobEntity = await this.entityMapper.payloadtoEntity(jobPayload);
    const jobEntity = this.mapper.map(jobPayload, JobPayload, JobEntity);
    console.log('jobEntity', jobEntity);

    // DB에 저장하는 작업
    await this.jobProducerRepository.create(jobEntity);

    // 큐에 넣는 작업
    await this.flowProducer.add({
      name: 'transcode',
      queueName: 'jobQueue',
      data: { idx: jobPayload.jobIdx, group: jobPayload.groupIdx },
      opts: { jobId: jobPayload.jobIdx },
      children: jobPayload.childJobs.map((childJob, index) => ({
        name: `${index + 1}`,
        data: { idx: childJob.childJobIdx, jobType: childJob.jobType },
        queueName: childJob.jobType,
        opts: {
          jobId: childJob.childJobIdx,
        },
      })),
    });

    return jobPayload.jobIdx;
  }
}

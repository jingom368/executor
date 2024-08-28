// job-producer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateJobRequest } from './job-type/request/job.request';
import { JobGroupService } from './job-producer.group.service';
import { JobRequestPayload } from './job-type/request/job.request.payload';
import { JobQueueService } from './job-producer.queue';
import { JobGroupParams } from './job-type/params/job.group.params';

@Controller('image-rendering')
export class JobProducerController {
  constructor(
    private readonly jobQueueService: JobQueueService,
    private readonly jobGroupService: JobGroupService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // 동적 vs 정적 고민 createJob, getJob
  @Post('createJobRequest')
  async createJobRequest<T extends JobRequestPayload>(
    @Body() createJobRequest: CreateJobRequest<T>,
  ): Promise<void> {
    const jobGroupParams = this.mapper.map(
      createJobRequest,
      CreateJobRequest,
      JobGroupParams,
    );

    const jobQueuePayload =
      await this.jobGroupService.createJobQueuePayload(jobGroupParams);

    await this.jobQueueService.addJob(jobQueuePayload);
    // console.log('createJobRequest', createJobRequest);
    // console.log('jobQueuePayload', JSON.stringify(jobQueuePayload, null, 2));
  }

  @Post('getJob')
  async getJob(): Promise<void> {}
}

// 이미지 합성과 템플릿 썸네일 만들어주는 작업.
// 잡의 종류에 따라 달라질 수 있는 부분이 어디일까?
// 어디가 공통이고 어디가 달라질까?
// 컨트롤러에 어떤 요청이 오는가?
// 그루핑된 잡을 넣어야 한다.
// 큐에 넣어야 한다.
// DB에 넣어야 한다.

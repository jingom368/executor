// job-producer.controller.ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
// import { CreateJobRequest } from './job-type/request/job.request';
// import { JobGroupService } from './job-producer.group.service';
import { JobQueueService } from './job-producer.queue';
import { RequestJobValidationPipe } from './pipe/job.request.pipe';
import { JobGroupPayloadFactory } from './factory/job.group.payload.factory';
import {
  CreateJobRequest,
  JobRequestPayload,
} from './model/job/request/job.request';

@Controller('image-rendering')
export class JobProducerController {
  constructor(
    private readonly jobQueueService: JobQueueService,
    private readonly jobGroupPayloadFactory: JobGroupPayloadFactory,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // 동적 vs 정적 고민 createJob, getJob
  @Post('job')
  @UsePipes(RequestJobValidationPipe)
  async createJobRequest<T extends JobRequestPayload>(
    @Body() createJobRequest: CreateJobRequest<T>,
  ): Promise<void> {
    const groupJobPayload = this.jobGroupPayloadFactory.createGroupJob(
      createJobRequest.jobType,
      createJobRequest.jobRequestPayload,
    );

    await this.jobQueueService.addJob(groupJobPayload);
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

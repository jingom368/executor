// job-producer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { JobDto } from './job-type/job.dto';
import { PayloadMapper } from './mapper/job.payload.mapper';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { JobQueuePayload } from './job-type/job.queue.payload';
import { JobProducerService } from './job-producer.service';
import { CreateJobRequest } from './job-type/job.request';
import { JobGroupService } from './job-producer.group.service';
import { JobRequestPayload } from './job-type/job.request.payload';
import { JobQueueService } from './job-producer.queue';

@Controller('image-rendering')
export class JobProducerController {
  constructor(
    private readonly jobProducerService: JobProducerService,
    private readonly jobQueueService: JobQueueService,
    private readonly payloadMapper: PayloadMapper,
    private readonly jobGroupService: JobGroupService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // 동적 vs 정적 고민 createJob, getJob
  @Post('createJob')
  async createJob(@Body('createJobDto') createJobDto: JobDto): Promise<string> {
    // console.log('jobDTO', jobDTO);
    // const jobPayload = await this.payloadMapper.DtoToPayload(jobDTO);
    const jobPayload = this.mapper.map(createJobDto, JobDto, JobQueuePayload);
    console.log('jobPayload', jobPayload);
    return this.jobProducerService.addJob(jobPayload);
  }

  @Post('getJob')
  async getJob(@Body('jobDTO') jobDto: JobDto): Promise<void> {
    console.log('getJob', jobDto);
  }

  // 동적 vs 정적 고민 createJob, getJob
  @Post('createJobRequest')
  async createJobRequest(
    @Body('createJobRequest')
    createJobRequest: CreateJobRequest<JobRequestPayload>,
  ): Promise<void> {
    // const { jobType, jobRequestPayload } = createJobRequest;
    const jobQueuePayload = await this.jobGroupService.createGroupJob(
      createJobRequest,
      // jobType,
      // jobRequestPayload,
    );
    await this.jobQueueService.addJob(jobQueuePayload);
    console.log('createJobRequest', createJobRequest);
    console.log('jobQueuePayload', JSON.stringify(jobQueuePayload, null, 2));
  }
}

// 이미지 합성과 템플릿 썸네일 만들어주는 작업.
// 잡의 종류에 따라 달라질 수 있는 부분이 어디일까?
// 어디가 공통이고 어디가 달라질까?
// 컨트롤러에 어떤 요청이 오는가?
// 그루핑된 잡을 넣어야 한다.
// 큐에 넣어야 한다.
// DB에 넣어야 한다.

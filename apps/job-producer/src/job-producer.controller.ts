// job-producer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { JobDto } from './job-type/job.dto';
import { PayloadMapper } from './mapper/job.payload.mapper';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { JobPayload } from './job-type/job.payload';
import { JobProducerService } from './job-producer.service';

@Controller('image-rendering')
export class JobProducerController {
  constructor(
    private readonly jobProducerService: JobProducerService,
    private readonly payloadMapper: PayloadMapper,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // 동적 vs 정적 고민 createJob, getJob
  @Post('createJob')
  async createJob(@Body('createJobDto') createJobDto: JobDto): Promise<string> {
    // console.log('jobDTO', jobDTO);
    // const jobPayload = await this.payloadMapper.DtoToPayload(jobDTO);
    const jobPayload = this.mapper.map(createJobDto, JobDto, JobPayload);
    console.log('jobPayload', jobPayload);
    return this.jobProducerService.addJob(jobPayload);
  }

  @Post('getJob')
  async getJob(@Body('jobDTO') jobDto: JobDto): Promise<string> {
    // console.log('jobDTO', jobDTO);
    // const jobPayload = await this.payloadMapper.DtoToPayload(jobDTO);
    const jobPayload = this.mapper.map(jobDto, JobDto, JobPayload);
    console.log('jobPayload', jobPayload);
    return this.jobProducerService.addJob(jobPayload);
  }
}

// 이미지 합성과 템플릿 썸네일 만들어주는 작업.
// 잡의 종류에 따라 달라질 수 있는 부분이 어디일까?
// 어디가 공통이고 어디가 달라질까?
// 컨트롤러에 어떤 요청이 오는가?
// 그루핑된 잡을 넣어야 한다.
// 큐에 넣어야 한다.
// DB에 넣어야 한다.

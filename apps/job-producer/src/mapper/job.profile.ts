// job.profile.ts
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { JobDto } from '../job-type/job.dto';
import { JobQueuePayload } from '../job-type/job.queue.payload';
import { JobEntity } from '../job-type/job.entity';
import { JobStatus } from '../job-type/job.status';
import { v4 as uuidv4 } from 'uuid';
import { CreateJobRequest } from '../job-type/job.request';
import { JobRequestPayload } from '../job-type/job.request.payload';
import { ImageRenderingJobQueuePayload } from '../job-type/image-rendering.job.queue.payload';

@Injectable()
export class JobProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.initialize();
  }

  private initialize(): void {
    this.profile(this.mapper);
  }

  private jobQueuePayloadMappings = [
    JobQueuePayload,
    ImageRenderingJobQueuePayload,
    // 다른 JobQueuePayload를 상속받는 클래스들을 여기에 추가
  ];

  override get profile(): MappingProfile {
    return (mapper) => {
      this.createJobDtoToJobQueuePayloadMap(mapper);
      this.createJobQueuePayloadToJobEntityMap(mapper);

      this.jobQueuePayloadMappings.forEach((jobQueuePayloadClass) => {
        this.createJobRequestToJobQueuePayloadMap(mapper, jobQueuePayloadClass);
      });
    };
  }

  private createJobDtoToJobQueuePayloadMap(mapper: Mapper): void {
    createMap(
      mapper,
      JobDto,
      JobQueuePayload,
      forMember(
        (dest) => dest.jobIdx,
        mapFrom(() => uuidv4()),
      ),
      forMember(
        (dest) => dest.groupIdx,
        mapFrom(() => uuidv4()),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src) =>
          src.pages.map(() => ({
            childJobIdx: uuidv4(),
            jobType: src.processType,
          })),
        ),
      ),
    );
  }

  private createJobQueuePayloadToJobEntityMap(mapper: Mapper): void {
    createMap(
      mapper,
      JobQueuePayload,
      JobEntity,
      forMember(
        (dest) => dest.jobIdx,
        mapFrom((src) => src.jobIdx),
      ),
      forMember(
        (dest) => dest.groupIdx,
        mapFrom((src) => src.groupIdx),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src) => src.childJobs),
      ),
      forMember(
        (dest) => dest.createdAt,
        mapFrom(() => new Date()),
      ),
      forMember(
        (dest) => dest.updatedAt,
        mapFrom(() => new Date()),
      ),
      forMember(
        (dest) => dest.status,
        mapFrom(() => JobStatus.WATING),
      ),
    );
  }

  private createJobRequestToJobQueuePayloadMap(
    mapper: Mapper,
    jobQueuePayloadClass: new () => JobQueuePayload,
  ): void {
    createMap(
      mapper,
      CreateJobRequest,
      jobQueuePayloadClass,
      forMember(
        (dest) => dest.jobIdx,
        mapFrom(() => uuidv4()),
      ),
      forMember(
        (dest) => dest.groupIdx,
        mapFrom(() => uuidv4()),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src: CreateJobRequest<JobRequestPayload>) =>
          src.jobRequestPayload.pages.split(',').map(() => ({
            childJobIdx: uuidv4(),
            jobType: src.jobType,
            jobData: src.jobRequestPayload,
          })),
        ),
      ),
    );
  }
}

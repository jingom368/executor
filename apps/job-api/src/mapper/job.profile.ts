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
import { JobEntity } from '@job-api/model/job/entity/job.entity';
import { ImageRenderingGroupJobPayload } from '@job-api/model/image/group/image-rendering.job.group.payload';
import { JobStatus } from '@job-api/model/enum/job.status';
import { PdfRenderingGroupJobPayload } from '@job-api/model/pdf/group/pdf-rendering.job.group.payload';

@Injectable()
export class JobProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.initialize();
  }

  private initialize(): void {
    this.profile(this.mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      this.createJobQueuePayloadToJobEntityMap(mapper);
      this.createJobQueuePayloadToJobEntityMap2(mapper);
    };
  }

  private createJobQueuePayloadToJobEntityMap(mapper: Mapper): void {
    createMap(
      mapper,
      ImageRenderingGroupJobPayload,
      JobEntity,
      forMember(
        (dest) => dest.jobId,
        mapFrom((src) => src.jobId),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src) =>
          src.childJobPayloadList.map((childJob) => ({
            ...childJob,
            jobStatus: JobStatus.WATING, // childJob에 jobStatus 필드 추가
          })),
        ),
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

  private createJobQueuePayloadToJobEntityMap2(mapper: Mapper): void {
    createMap(
      mapper,
      PdfRenderingGroupJobPayload,
      JobEntity,
      forMember(
        (dest) => dest.jobId,
        mapFrom((src) => src.jobId),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src) =>
          src.childJobPayloadList.map((childJob) => ({
            ...childJob,
            jobStatus: JobStatus.WATING, // childJob에 jobStatus 필드 추가
          })),
        ),
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
}

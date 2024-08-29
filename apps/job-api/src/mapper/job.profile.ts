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
import { GroupJobPayload } from '@job-api/job-type/queue.payload/job.group.payload/job.group.payload';
import { JobEntity } from '../job-type/entity/job.entity';
import { JobStatus } from '../job-type/entity/job.status';
import { CreateJobRequest } from '../job-type/request/job.request';
import { JobPayload } from '@job-api/job-type/job.payload/job.payload';
import { ImageRenderingGroupJobPayload } from '@job-api/job-type/queue.payload/job.group.payload/image-rendering.job.group.payload';
import { JobGroupParams } from '../job-type/params/job.group.params';

@Injectable()
export class JobProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.initialize();
  }

  private initialize(): void {
    this.profile(this.mapper);
  }

  // private jobQueuePayloadMappings = [
  //   JobQueuePayload,
  //   ImageRenderingJobQueuePayload,
  //   // 다른 JobQueuePayload를 상속받는 클래스들을 여기에 추가
  // ];

  override get profile(): MappingProfile {
    return (mapper) => {
      // this.createJobQueuePayloadToJobEntityMap(mapper);
      // this.createJobRequestToJobGroupParamsMap(mapper); // 추가된 매핑
    };
  }

  // private createJobQueuePayloadToJobEntityMap(mapper: Mapper): void {
  //   createMap(
  //     mapper,
  //     GroupJobPayload,
  //     JobEntity,
  //     forMember(
  //       (dest) => dest.jobId,
  //       mapFrom((src) => src.jobId),
  //     ),
  //     forMember(
  //       (dest) => dest.childJobPayloadList,
  //       mapFrom((src) =>
  //         src.childJobPayloadList.map((childJob) => ({
  //           ...childJob,
  //           childJobStatus: JobStatus.WATING, // childJob에 jobStatus 필드 추가
  //         })),
  //       ),
  //     ),
  //     forMember(
  //       (dest) => dest.createdAt,
  //       mapFrom(() => new Date()),
  //     ),
  //     forMember(
  //       (dest) => dest.updatedAt,
  //       mapFrom(() => new Date()),
  //     ),
  //     forMember(
  //       (dest) => dest.status,
  //       mapFrom(() => JobStatus.WATING),
  //     ),
  //   );
  // }

  // private createJobRequestToJobGroupParamsMap(mapper: Mapper): void {
  //   createMap(
  //     mapper,
  //     CreateJobRequest<JobRequestPayload>,
  //     JobGroupParams,
  //     forMember(
  //       (dest) => dest.jobType,
  //       mapFrom((src) => src.jobType),
  //     ),
  //     forMember(
  //       (dest) => dest.designHistoryIndex,
  //       mapFrom((src) => src.jobRequestPayload.designHistoryIndex),
  //     ),
  //     forMember(
  //       (dest) => dest.designIndex,
  //       mapFrom((src) => src.jobRequestPayload.designIndex),
  //     ),
  //     forMember(
  //       (dest) => dest.designName,
  //       mapFrom((src) => src.jobRequestPayload.designName),
  //     ),
  //     forMember(
  //       (dest) => dest.docSize,
  //       mapFrom((src) => src.jobRequestPayload.docSize),
  //     ),
  //     forMember(
  //       (dest) => dest.dpi,
  //       mapFrom((src) => src.jobRequestPayload.dpi),
  //     ),
  //     forMember(
  //       (dest) => dest.measure,
  //       mapFrom((src) => src.jobRequestPayload.measure),
  //     ),
  //     forMember(
  //       (dest) => dest.imgCombine,
  //       mapFrom((src) => src.jobRequestPayload.imgCombine),
  //     ),
  //     forMember(
  //       (dest) => dest.extension,
  //       mapFrom((src) => src.jobRequestPayload.extension),
  //     ),
  //     forMember(
  //       (dest) => dest.pageIdxList,
  //       mapFrom((src) => src.jobRequestPayload.pageIdxList),
  //     ),
  //     forMember(
  //       (dest) => dest.zip,
  //       mapFrom((src) => src.jobRequestPayload.zip),
  //     ),
  //   );
  // }
}

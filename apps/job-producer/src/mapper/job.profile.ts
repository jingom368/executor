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
import { JobQueuePayload } from '../job-type/queue.payload/job.queue.payload';
import { JobEntity } from '../job-type/entity/job.entity';
import { JobStatus } from '../job-type/entity/job.status';
import { CreateJobRequest } from '../job-type/request/job.request';
import { JobRequestPayload } from '../job-type/request/job.request.payload';
import { ImageRenderingJobQueuePayload } from '../job-type/queue.payload/image-rendering.job.queue.payload';
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

  private jobQueuePayloadMappings = [
    JobQueuePayload,
    ImageRenderingJobQueuePayload,
    // 다른 JobQueuePayload를 상속받는 클래스들을 여기에 추가
  ];

  override get profile(): MappingProfile {
    return (mapper) => {
      this.createJobQueuePayloadToJobEntityMap(mapper);

      this.createJobRequestToJobGroupParamsMap(mapper); // 추가된 매핑
    };
  }

  private createJobQueuePayloadToJobEntityMap(mapper: Mapper): void {
    createMap(
      mapper,
      JobQueuePayload,
      JobEntity,
      forMember(
        (dest) => dest.jobIdx,
        mapFrom((src) => src.jobId),
      ),
      forMember(
        (dest) => dest.groupIdx,
        mapFrom((src) => src.groupId),
      ),
      forMember(
        (dest) => dest.childJobs,
        mapFrom((src) =>
          src.childJobs.map((childJob) => ({
            ...childJob,
            childJobStatus: JobStatus.WATING, // childJob에 jobStatus 필드 추가
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

  // private createJobRequestToJobQueuePayloadMap(
  //   mapper: Mapper,
  //   jobQueuePayloadClass: new () => JobQueuePayload,
  // ): void {
  //   createMap(
  //     mapper,
  //     CreateJobRequest,
  //     jobQueuePayloadClass,
  //     forMember(
  //       (dest) => dest.jobId,
  //       mapFrom(() => uuidv4()),
  //     ),
  //     forMember(
  //       (dest) => dest.groupId,
  //       mapFrom(() => uuidv4()),
  //     ),
  //     forMember(
  //       (dest) => dest.childJobs,
  //       mapFrom((src: CreateJobRequest<JobRequestPayload>) =>
  //         src.jobRequestPayload.pages.split(',').map(() => ({
  //           childJobId: uuidv4(),
  //           childJobType: src.jobType,
  //           childJobData: src.jobRequestPayload,
  //         })),
  //       ),
  //     ),
  //     forMember(
  //       (dest) => dest.jobData,
  //       mapFrom((src) => src.jobRequestPayload),
  //     ),
  //   );
  // }

  private createJobRequestToJobGroupParamsMap(mapper: Mapper): void {
    createMap(
      mapper,
      CreateJobRequest<JobRequestPayload>,
      JobGroupParams,
      forMember(
        (dest) => dest.jobType,
        mapFrom((src) => src.jobType),
      ),
      forMember(
        (dest) => dest.designHistoryIndex,
        mapFrom((src) => src.jobRequestPayload.designHistoryIndex),
      ),
      forMember(
        (dest) => dest.designIndex,
        mapFrom((src) => src.jobRequestPayload.designIndex),
      ),
      forMember(
        (dest) => dest.designName,
        mapFrom((src) => src.jobRequestPayload.designName),
      ),
      forMember(
        (dest) => dest.docSize,
        mapFrom((src) => src.jobRequestPayload.docSize),
      ),
      forMember(
        (dest) => dest.dpi,
        mapFrom((src) => src.jobRequestPayload.dpi),
      ),
      forMember(
        (dest) => dest.measure,
        mapFrom((src) => src.jobRequestPayload.measure),
      ),
      forMember(
        (dest) => dest.imgCombine,
        mapFrom((src) => src.jobRequestPayload.imgCombine),
      ),
      forMember(
        (dest) => dest.extension,
        mapFrom((src) => src.jobRequestPayload.extension),
      ),
      forMember(
        (dest) => dest.pages,
        mapFrom((src) => src.jobRequestPayload.pages),
      ),
      forMember(
        (dest) => dest.zip,
        mapFrom((src) => src.jobRequestPayload.zip),
      ),
    );
  }
}

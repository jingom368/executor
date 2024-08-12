// job.profile.ts
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { JobDto } from '../job-type/job.dto';
import { JobPayload } from '../job-type/job.payload';
import { JobEntity } from '../job-type/job.entity';
import { JobStatus } from '../job-type/job.status';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.initialize();
  }

  private initialize() {
    this.profile(this.mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        JobDto,
        JobPayload,
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

      createMap(
        mapper,
        JobPayload,
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
    };
  }
}

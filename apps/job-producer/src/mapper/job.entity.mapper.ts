import { JobPayload } from '../job-type/job.payload';
import { JobStatus } from '../job-type/job.status';
import { JobEntity } from '../job-type/job.entity';

export class EntityMapper {
  async payloadtoEntity(jobPayload: JobPayload): Promise<JobEntity> {
    const jobEntity = new JobEntity();
    jobEntity.jobIdx = jobPayload.jobIdx;
    jobEntity.groupIdx = jobPayload.groupIdx;
    jobEntity.childJobs = jobPayload.childJobs;
    jobEntity.createdAt = new Date();
    jobEntity.updatedAt = new Date();
    jobEntity.status = JobStatus.WATING;

    return jobEntity;
  }
}

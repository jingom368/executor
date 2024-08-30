import { JobType } from '../../enum/job.type';

export class CreateJobRequest<T extends JobRequestPayload> {
  public jobType: JobType;

  public jobRequestPayload: T;
}

export class JobRequestPayload {}

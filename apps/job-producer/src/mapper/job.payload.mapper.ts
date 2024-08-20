import { ChildJobPayload } from '../job-type/job.child.payload';
import { JobDto } from '../job-type/job.dto';
import { v4 as uuidv4 } from 'uuid';
import { JobQueuePayload } from '../job-type/job.queue.payload';

export class PayloadMapper {
  async DtoToPayload(jobDto: JobDto): Promise<JobQueuePayload> {
    const jobPayload = new JobQueuePayload();
    jobPayload.jobIdx = uuidv4(); // Generate a random UUID for jobIdx
    jobPayload.groupIdx = uuidv4(); // Generate a random UUID for groupIdx
    jobPayload.childJobs = jobDto.pages.map(() => {
      const childJob = new ChildJobPayload();
      childJob.childJobIdx = uuidv4();
      childJob.jobType = jobDto.processType;
      return childJob;
    });

    return jobPayload;
  }
}

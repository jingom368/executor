import { ChildJobPayload } from './job.child.payload';

export class JobPayload {
  jobIdx: string;
  groupIdx: string;
  childJobs: ChildJobPayload[];
}

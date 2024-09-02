import { JobPro } from '@taskforcesh/bullmq-pro';

export interface JobHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleCompletion(job: JobPro): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleFailure(job: JobPro): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleActive(job: JobPro): Promise<void>;
}

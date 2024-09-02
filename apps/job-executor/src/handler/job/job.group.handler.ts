import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobHandler } from './job.handler';

export abstract class GroupJobHandler implements JobHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleCompletion(job: JobPro): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleFailure(job: JobPro): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleActive(job: JobPro): Promise<void> {}
}

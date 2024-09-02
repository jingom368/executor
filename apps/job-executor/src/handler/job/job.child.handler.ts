import { JobProducerRepository } from '@job-api/job-producer.repository';
import { JobHandler } from './job.handler';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobStatus } from '@job-api/model/enum/job.status';

export abstract class ChildJobHandler implements JobHandler {
  constructor(private readonly jobProducerRepository: JobProducerRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleCompletion(job: JobPro): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleFailure(job: JobPro): Promise<void> {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleActive(job: JobPro): Promise<void> {}

  protected async updateJobStatusToCompleted(job: JobPro): Promise<void> {
    const { parentId, childJobId } = this.getJobDetails(job);
    await this.jobProducerRepository.updateChildJobStatus(
      parentId,
      childJobId,
      JobStatus.COMPLETED,
    );
  }

  protected async updateJobStatusToProgress(job: JobPro): Promise<void> {
    const { parentId, childJobId } = this.getJobDetails(job);
    await this.jobProducerRepository.updateChildJobStatus(
      parentId,
      childJobId,
      JobStatus.IN_PROGRESS,
    );
  }

  protected getJobDetails(job: JobPro) {
    return {
      parentId: job.opts.parent.id,
      childJobId: job.opts.jobId,
      jobType: job.data.jobType,
    };
  }
}

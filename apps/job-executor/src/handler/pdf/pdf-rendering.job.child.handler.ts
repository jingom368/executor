import { JobPro } from '@taskforcesh/bullmq-pro';
import { ChildJobHandler } from '../job/job.child.handler';
import { Injectable } from '@nestjs/common';
import { JobProducerRepository } from '@job-api/job-producer.repository';

@Injectable()
export class PdfRenderingChildJobHandler extends ChildJobHandler {
  constructor(jobProducerRepository: JobProducerRepository) {
    super(jobProducerRepository);
  }
  async handleCompletion(job: JobPro) {
    console.log(`Handling completion of PDF rendering job ${job.id}`);
  }

  async handleActive(job: JobPro) {
    console.log(`Handling active of PDF rendering job ${job.id}`);
  }

  async handleFailure(job: JobPro) {
    console.log(`Handling failure of PDF rendering job ${job.id}`);
  }
}

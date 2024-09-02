import { Injectable } from '@nestjs/common';
import { GroupJobHandler } from '../job/job.group.handler';

@Injectable()
export class PdfRenderingGroupJobHandler extends GroupJobHandler {
  async handleGroup(jobId, jobInput) {
    console.log(
      `Handling PDF rendering group job ${jobId} with input ${jobInput}`,
    );
  }
}

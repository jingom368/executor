import { JobPro } from '@taskforcesh/bullmq-pro';
import { GroupJobHandler } from '../job/job.group.handler';
import { Injectable } from '@nestjs/common';
import { MergeService } from '@job-executor/services/merge.service';
import { CompressService } from '@job-executor/services/compress.service';

@Injectable()
export class ImageRenderingGroupJobHandler extends GroupJobHandler {
  constructor(
    private readonly compressService: CompressService,
    private readonly mergeService: MergeService,
  ) {
    super();
  }
  async handleCompletion(job: JobPro): Promise<void> {
    const { zip, imgCombine } = job.data;

    await this.compressService.handleZip(zip, job.data);
    await this.mergeService.handleImgCombine(imgCombine, job.data);
  }

  async handleFailure(job: JobPro): Promise<void> {
    // 실제 구현
    console.log(`Image rendering job failed: ${job.id}`);
  }

  async handleActive(job: JobPro): Promise<void> {
    // 실제 구현
    console.log(`Image rendering job active: ${job.id}`);
  }
}

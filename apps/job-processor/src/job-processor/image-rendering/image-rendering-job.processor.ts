import { JobProcessor } from '../job.processor';
import { JobRegister } from '../job-processor.decorator';
import { ImageRenderingJobOutput, JobOutput } from '../job-output';
import { Injectable } from '@nestjs/common';

@Injectable()
@JobRegister('IMAGE_RENDERING')
export class ImageRenderingJobProcessor extends JobProcessor<any, JobOutput> {
  constructor(
    private readonly imageRenderingJobOutput: ImageRenderingJobOutput,
  ) {
    super();
    if (!this.imageRenderingJobOutput) {
      throw new Error('ImageRenderingJobOutput is not initialized');
    }
  }
  public override async processJob(): Promise<any> {
    // return Promise.resolve('ImageRenderingJobProcessor.processJob done');
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.imageRenderingJobOutput), 5000);
    });
  }
}

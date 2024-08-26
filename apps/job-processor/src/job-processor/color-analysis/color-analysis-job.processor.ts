// import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobProcessor } from '../job.processor';
import { JobRegister } from '../job-processor.decorator';

@JobRegister('COLOR_RENDERING')
export class ColorAnalysisJobProcessor extends JobProcessor<any, any> {
  public override async processJob(): Promise<any> {
    // return Promise.resolve('ColorAnalysisJobProcessor.processJob done');
    // console.log('job.data', job.data);
    return new Promise((resolve) => {
      setTimeout(() => resolve('ColorAnalysisJobProcessor 완료'), 5000);
    });
  }
}

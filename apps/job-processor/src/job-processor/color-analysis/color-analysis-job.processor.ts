// import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobProcessor } from '../job.processor';
import { JobRegister } from '../job-processor.decorator';
// import { JobType } from '@job-producer/job-type/job.type';

@JobRegister('COLOR_ANALYSIS')
export class COLOR_ANALYSISJobProcessor extends JobProcessor<any, any> {
  public override async processJob(): Promise<any> {
    // return Promise.resolve('ColorAnalysisJobProcessor.processJob done');
    // console.log('job.data', job.data);
    return new Promise((resolve) => {
      setTimeout(() => resolve('ColorAnalysisJobProcessor 완료'), 5000);
    });
  }
}

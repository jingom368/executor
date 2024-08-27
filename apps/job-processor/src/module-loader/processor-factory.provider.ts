import { JobProcessor } from '@job-processor/job-processor/job.processor';
import { Provider } from '@nestjs/common';
import { getJobRegisterName } from '@job-processor/job-processor/job-processor.decorator';
import { JobType } from './job.type';

export const processorFactoryProvider: Provider = {
  provide: 'ProcessorFactory',
  useFactory: (...processors: JobProcessor<any, any>[]) => {
    const processorMap = new Map<JobType, JobProcessor<any, any>>();
    processors.forEach((processor) => {
      const jobType = getJobRegisterName(processor.constructor) as JobType;
      processorMap.set(jobType, processor);
      //   console.log('processor', processor);
    });
    return processorMap;
  },
  // useFacotry의 인자로 포함됨
  inject: [
    ...Object.values(JobType).map((jobType) => `${jobType}JobProcessor`),
  ],
};

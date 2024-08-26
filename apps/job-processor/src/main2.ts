// 안되는 코드 이유는?
// import { loadProcessor } from './processor-loader';
// import { JobPro } from '@taskforcesh/bullmq-pro';

// export default async (job: JobPro) => {
//   const jobProcessor = await loadProcessor(job.data.jobType);
//   return await jobProcessor.process(job);
//   // console.log('job.data', job.data);
// };

// 되는 코드
// import { loadProcessor } from './processor-loader';
// import { JobPro } from '@taskforcesh/bullmq-pro';

// class JobProcessor {
//   async processJob(job: JobPro) {
//     const jobProcessor = await loadProcessor(job.data.jobType);
//     return await jobProcessor.process(job);
//     // console.log('job.data', job.data);
//   }
// }

// export default async (job: JobPro) => {
//   const processor = new JobProcessor();
//   return await processor.processJob(job);
// };

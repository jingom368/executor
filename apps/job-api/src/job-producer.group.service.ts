// import { Injectable } from '@nestjs/common';
// import { JobGroupFactory } from './mapper/job.factory';
// import { JobGroupParams } from './job-type/params/job.group.params';
// import { v4 as uuidv4 } from 'uuid';
// import { JobQueuePayload } from './job-type/queue.payload/job.group.payload/job.group.payload';
// import { ChildJobPayload } from './job-type/queue.payload/job.child.payload/job.child.payload';
// import { GroupJobInput } from './job-type/queue.payload/job.group.input/image-rendering.job.group.input';
// import { childJobInput } from './job-type/queue.payload/job.child.input/job.child.input';
// import { JobType } from './job-type/job/job.type';
// import { JobRequestPayload } from './job-type/job.payload/image-rendering.job.payload';

// @Injectable()
// export class JobGroupService {
//   constructor(private readonly jobGroupFactory: JobGroupFactory) {}

//   async createJobQueuePayload(
//     // jobGroupParams: JobGroupParams,
//     jobType: JobType,
//     jobPayload: JobRequestPayload,
//   ): Promise<JobQueuePayload> {
//     // const { jobQueueData, jobQueueChildDataArray } =
//     //   this.createJobQueueData(jobGroupParams);

//     // -> jobGroupPayloadFactory
//     const { JobQueueData, JobQueueChildData } = this.jobGroupFactory.get(
//       // jobGroupParams.jobType,
//       // jobGroupParams,
//       jobType,
//       jobPayload,
//     );

//     // payloadParams = this.jobGroupFactory.createPayload()
//     // jobGroupPayload가 get해서 할 수 있도록

//     // get -> class를 받는다.
//     // getGroupJobInput
//     // getChildJobInput

//     const payloadParams = this.createPayloadParams(
//       jobGroupParams.jobType,
//       JobQueueData,
//       JobQueueChildData,
//     );

//     return payloadParams;
//   }

//   // private createJobQueueData(jobGroupParams: JobGroupParams): {
//   //   jobQueueData: JobQueueData;
//   //   jobQueueChildDataArray: JobQueueChildData[];
//   // } {
//   //   const jobQueueData: JobQueueData = {
//   //     imgCombine: jobGroupParams.imgCombine,
//   //     zip: jobGroupParams.zip,
//   //   };

//   //   const jobQueueChildDataArray: JobQueueChildData[] =
//   //     jobGroupParams.pageIdxList.map((page) => ({
//   //       designIndex: jobGroupParams.designIndex,
//   //       designName: jobGroupParams.designName,
//   //       extension: jobGroupParams.extension,
//   //       docSize: jobGroupParams.docSize,
//   //       page: page, // 페이지 번호를 추가합니다.
//   //     }));

//   //   return { jobQueueData, jobQueueChildDataArray };
//   // }

//   private createPayloadParams(
//     jobType: JobType,
//     groupJobInput: GroupJobInput,
//     childJobInputList: childJobInput[],
//   ): JobQueuePayload {
//     const jobId = uuidv4();
//     const childJobs = childJobInputList.map((childJobInput) => ({
//       childJobId: uuidv4(), // 각 페이지에 대해 고유한 childJobId 생성
//       childJobType: jobType,
//       childJobInput: childJobInput,
//     }));

//     const childJobPayloads = childJobs.map(
//       (childJob) => new ChildJobPayload(childJob),
//     );

//     return new JobQueuePayload({
//       jobId: jobId,
//       childJobs: childJobPayloads,
//       groupJobInput: groupJobInput,
//     });
//   }
// }

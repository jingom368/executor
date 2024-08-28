import { Injectable } from '@nestjs/common';
import { JobGroupFactory } from './mapper/job.factory';
import { JobGroupParams } from './job-type/params/job.group.params';
import { PageProps } from './job-type/props/pageProps';
import { v4 as uuidv4 } from 'uuid';
import { JobQueuePayload } from './job-type/queue.payload/job.queue.payload';
import { ChildJobPayload } from './job-type/queue.payload/job.child.payload';
import { JobQueueData } from './job-type/queue.payload/job.queue.data';
import { JobQueueChildData } from './job-type/queue.payload/job.child.data';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { JobType } from './job-type/job/job.type';
import { DesignApiService } from './api/design.api.service';

@Injectable()
export class JobGroupService {
  constructor(
    private readonly jobGroupFactory: JobGroupFactory,
    private readonly designApiService: DesignApiService,
  ) {}

  async createJobQueuePayload(
    jobGroupParams: JobGroupParams,
  ): Promise<JobQueuePayload> {
    const fetchedJobData = await this.designApiService.fetchJobData();

    const calculatedParams: CalculatedParams = this.calculateJobGroupParams(
      jobGroupParams,
      fetchedJobData,
    );

    const { jobQueueData, jobQueueChildDataArray } = this.createJobQueueData(
      jobGroupParams,
      fetchedJobData,
      calculatedParams,
    );
    const payloadParams = this.createPayloadParams(
      jobGroupParams.jobType,
      jobQueueData,
      jobQueueChildDataArray,
    );

    return payloadParams;
  }

  private calculateJobGroupParams(
    jobGroupParams: JobGroupParams,
    fetchedJobData: PageProps,
  ): CalculatedParams {
    console.log('fetchedJobData', fetchedJobData);
    const [width, height] = jobGroupParams.docSize.split('x').map(Number);

    // Calculate pixel dimensions based on DPI and measure
    const pixelWidth =
      jobGroupParams.measure === 'px'
        ? width
        : (width * jobGroupParams.dpi) / 25.4;
    const pixelHeight =
      jobGroupParams.measure === 'px'
        ? height
        : (height * jobGroupParams.dpi) / 25.4;

    const dimension: Dimension = {
      width: pixelWidth,
      height: pixelHeight,
    };

    const pages: number[] = jobGroupParams.pages.split(',').map(Number);

    return { dimension, pages };
    // 다른 필요한 속성들도 여기에 추가할 수 있습니다.
  }

  private createJobQueueData(
    jobGroupParams: JobGroupParams,
    fetchedJobData: PageProps,
    calculatedParams: CalculatedParams,
  ): {
    jobQueueData: JobQueueData;
    jobQueueChildDataArray: JobQueueChildData[];
  } {
    const jobQueueData: JobQueueData = {
      imgCombine: jobGroupParams.imgCombine,
      zip: jobGroupParams.zip,
    };

    const jobQueueChildDataArray: JobQueueChildData[] =
      calculatedParams.pages.map((page) => ({
        extension: jobGroupParams.extension,
        designName: jobGroupParams.designName,
        designIndex: jobGroupParams.designIndex,
        dimension: calculatedParams.dimension,
        page: page, // 페이지 번호를 추가합니다.
      }));

    return { jobQueueData, jobQueueChildDataArray };
  }

  private createPayloadParams(
    jobType: JobType,
    jobQueueData: JobQueueData,
    jobQueueChildDataArray: JobQueueChildData[],
  ): JobQueuePayload {
    const jobId = uuidv4();
    const groupId = uuidv4();
    const childJobId = uuidv4();
    const childJobs = jobQueueChildDataArray.map((childData, index) => ({
      childJobId: `${childJobId}-${index}`, // 각 페이지에 대해 고유한 childJobId 생성
      childJobType: jobType,
      childJobData: childData,
    }));

    const childJobPayloads = childJobs.map(
      (childJob) => new ChildJobPayload(childJob),
    );

    return new JobQueuePayload({
      jobId: jobId,
      groupId: groupId,
      childJobs: childJobPayloads,
      jobData: jobQueueData,
    });
  }
}

export class Dimension {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

export class CalculatedParams {
  @Type(() => Dimension)
  dimension: Dimension;

  @IsNumber({}, { each: true })
  pages: number[];
  // 다른 필요한 속성들도 여기에 추가할 수 있습니다.
}

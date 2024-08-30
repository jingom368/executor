import { ImageRenderingJobRequestPayload } from '../request/image-rendering.job.request';
import { ImageRenderingGroupJobInput } from './image-rendering.job.group.input';
import { GroupJobPayload } from '../../job/group/job.group.payload';
import { v4 as uuidv4 } from 'uuid';
import { JobType } from '@job-api/model/enum/job.type';
import { ImageRenderingChildJobPayload } from '../child/job.child.payload';

export class ImageRenderingGroupJobPayload extends GroupJobPayload {
  public jobId: string;
  public childJobPayloadList: ImageRenderingChildJobPayload[];
  public groupJobInput: ImageRenderingGroupJobInput;

  constructor(jobType: JobType, params: ImageRenderingJobRequestPayload) {
    super();

    this.jobId = uuidv4();
    this.jobType = jobType;
    this.childJobPayloadList = params.pageIdxList.map(
      (page) =>
        new ImageRenderingChildJobPayload({
          jobId: uuidv4(),
          jobInput: {
            jobType: jobType,
            designIndex: params.designIndex,
            designName: params.designName,
            extension: params.extension,
            docSize: params.docSize,
            page: page,
          },
        }),
    );
    this.groupJobInput = new ImageRenderingGroupJobInput({
      imgCombine: params.imgCombine,
      zip: params.zip,
    });
  }
}

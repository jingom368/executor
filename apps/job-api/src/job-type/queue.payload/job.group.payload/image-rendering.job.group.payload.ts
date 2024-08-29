import { ImageRenderingJobPayload } from '@job-api/job-type/job.payload/image-rendering.job.payload';
import { ChildJobPayload } from '../job.child.payload/job.child.payload';
import { ImageRenderingGroupJobInput } from '../job.group.input/image-rendering.job.group.input';
import { GroupJobInput } from '../job.group.input/job.group.input';
import { GroupJobPayload } from './job.group.payload';
import { v4 as uuidv4 } from 'uuid';

export class ImageRenderingGroupJobPayload extends GroupJobPayload {
  public jobId: string;
  public childJobPayloadList: ChildJobPayload[];
  public groupJobInput: GroupJobInput;

  constructor(params: ImageRenderingJobPayload) {
    super();

    this.jobId = uuidv4();
    this.childJobPayloadList = params.pageIdxList.map((page) => ({
      jobId: uuidv4(),
      jobType: params.jobType,
      jobInput: {
        designIndex: params.designIndex,
        designName: params.designName,
        extension: params.extension,
        docSize: params.docSize,
        page: page,
      },
    }));
    this.groupJobInput = new ImageRenderingGroupJobInput({
      imgCombine: params.imgCombine,
      zip: params.zip,
    });
  }
}

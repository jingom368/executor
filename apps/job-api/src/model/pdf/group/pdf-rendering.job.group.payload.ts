import { PdfRenderingJobRequestPayload } from '../request/pdf-rendering.job.request';
import { GroupJobPayload } from '../../job/group/job.group.payload';
import { v4 as uuidv4 } from 'uuid';
import { JobType } from '@job-api/model/enum/job.type';
import { PdfRenderingGroupJobInput } from './pdf-rendering.job.group.input';
import { PdfRenderingChildJobPayload } from '../child/job.child.payload';

export class PdfRenderingGroupJobPayload extends GroupJobPayload {
  public jobId: string;
  public jobType: JobType;
  public childJobPayloadList: PdfRenderingChildJobPayload[];
  public groupJobInput: PdfRenderingGroupJobInput;

  constructor(jobType: JobType, params: PdfRenderingJobRequestPayload) {
    super();
    this.jobId = uuidv4();
    this.jobType = jobType;
    this.childJobPayloadList = [
      new PdfRenderingChildJobPayload({
        jobId: uuidv4(),
        jobInput: {
          jobType: jobType,
          designIndex: params.designIndex,
          designName: params.designName,
          extension: params.extension,
          docSize: params.docSize,
          page: params.pageIdxList[0], // 주의: 여기서는 첫 번째 페이지만 사용합니다
        },
      }),
    ];
    this.groupJobInput = new PdfRenderingGroupJobInput(params.rasterize);
  }
}

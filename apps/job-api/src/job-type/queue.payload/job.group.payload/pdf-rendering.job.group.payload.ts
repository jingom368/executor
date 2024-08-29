import { PdfRenderingJobPayload } from '@job-api/job-type/job.payload/pdf-rendering.job.payload';
import { GroupJobPayload } from './job.group.payload';
import { v4 as uuidv4 } from 'uuid';
import { ChildJobPayload } from '../job.child.payload/job.child.payload';
import { GroupJobInput } from '../job.group.input/job.group.input';
import { JobType } from '@job-api/job-type/job/job.type';
import { PdfRenderingGroupJobInput } from '../job.group.input/pdf-rendering.job.group.input';

export class PdfRenderingGroupJobPayload extends GroupJobPayload {
  public jobId: string;
  public jobType: JobType; // jobType 속성 추가
  public childJobPayloadList: ChildJobPayload[];
  public groupJobInput: GroupJobInput;

  constructor(params: PdfRenderingJobPayload) {
    super();
    this.jobId = uuidv4();
    this.jobType = params.jobType;
    this.childJobPayloadList = [
      {
        jobId: uuidv4(),
        jobType: params.jobType,
        jobInput: {
          designIndex: params.designIndex,
          designName: params.designName,
          extension: params.extension,
          docSize: params.docSize,
          page: params.pageIdxList[0], // 주의: 여기서는 첫 번째 페이지만 사용합니다
        },
      },
    ];
    this.groupJobInput = new PdfRenderingGroupJobInput(true);
  }
}

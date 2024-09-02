import { JobType } from '@job-api/model/enum/job.type';
import { GroupJobInput } from '../../job/group/job.group.input';

type PdfRenderingGroupJobInputParams = {
  jobType: JobType;
  rasterize: boolean;
};
export class PdfRenderingGroupJobInput extends GroupJobInput {
  public jobType: JobType;
  public rasterize: boolean;

  constructor(params: PdfRenderingGroupJobInputParams) {
    super();
    this.jobType = params.jobType;
    this.rasterize = params.rasterize;
  }
}

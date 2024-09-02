import { IsEnum } from 'class-validator';
import { GroupJobInput } from '../../job/group/job.group.input';
import { JobType } from '@job-api/model/enum/job.type';

type ImageRenderingGroupJobInputParams = {
  jobType: JobType;
  imgCombine: boolean;
  zip: boolean;
};

export class ImageRenderingGroupJobInput extends GroupJobInput {
  @IsEnum(JobType)
  public jobType: JobType;

  public imgCombine: boolean;
  public zip: boolean;

  constructor(params: ImageRenderingGroupJobInputParams) {
    super();
    this.jobType = params.jobType;
    this.imgCombine = params.imgCombine;
    this.zip = params.zip;
  }
}

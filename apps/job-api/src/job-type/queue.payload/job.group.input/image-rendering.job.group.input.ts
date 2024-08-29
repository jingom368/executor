import { GroupJobInput } from './job.group.input';

type ImageRenderingGroupJobInputParams = {
  imgCombine: boolean;
  zip: boolean;
};

export class ImageRenderingGroupJobInput extends GroupJobInput {
  imgCombine: boolean;
  zip: boolean;

  constructor(params: ImageRenderingGroupJobInputParams) {
    super();
    this.imgCombine = params.imgCombine;
    this.zip = params.zip;
  }
}

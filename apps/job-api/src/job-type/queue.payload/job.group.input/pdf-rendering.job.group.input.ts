import { GroupJobInput } from './job.group.input';

export class PdfRenderingGroupJobInput extends GroupJobInput {
  rasterize: boolean;

  constructor(rasterize: boolean) {
    super();
    this.rasterize = rasterize;
  }
}

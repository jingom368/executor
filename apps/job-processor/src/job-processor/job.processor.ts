import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobOutput } from './job-output';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class JobProcessor<INPUT, OUTPUT extends JobOutput> {
  protected abstract processJob(job: JobPro<INPUT, OUTPUT>): Promise<OUTPUT>;

  private async uploadFile(output: OUTPUT): Promise<string> {
    if (!output.hasFile()) {
      return '';
    }
    console.log('upload 시도', output.getLocalFilePath());
    return 's3/file.jpg';
  }

  public async process(job: JobPro<INPUT, OUTPUT>): Promise<OUTPUT> {
    const output: OUTPUT = await this.processJob(job);
    const uploadedFilePath = await this.uploadFile(output);
    output.updateFileUrl(uploadedFilePath);
    return output;
  }
}

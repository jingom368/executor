import { JobProcessor } from '../job.processor';
import { JobRegister } from '../job-processor.decorator';
import { PdfRenderingJobOutput, JobOutput } from '../job-output';
import { JobPro } from '@taskforcesh/bullmq-pro';
import * as fs from 'fs';
import * as path from 'path';

@JobRegister('PDF_RENDERING')
export class PDF_RENDERINGJobProcessor extends JobProcessor<any, JobOutput> {
  constructor(private readonly pdfRenderingJobOutput: PdfRenderingJobOutput) {
    super();
  }
  public override async processJob(job: JobPro): Promise<any> {
    const jobId = job.opts.jobId;
    // 프로젝트 루트 경로 계산
    const rootDir = process.cwd();

    // assets 디렉토리 경로 생성
    const assetsDir = path.join(rootDir, 'assets');

    // 파일 경로 설정
    const filePath = path.join(assetsDir, `s3/${jobId}.jpg`);

    try {
      this.createFile(filePath, `${jobId}.jpg`);
    } catch (error) {
      throw new Error(`Error creating file, error`);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(this.pdfRenderingJobOutput), 1000);
    });
  }

  private createFile(filePath: string, content: string): void {
    // 폴더가 존재하지 않으면 생성
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 파일 생성 로직 (예: 빈 파일 생성)
    fs.writeFileSync(filePath, content);
  }
}

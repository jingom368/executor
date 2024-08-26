import { NestFactory } from '@nestjs/core';
import { JobProcessorModule } from './job-processor.module';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobProcessorService } from './job-processor.service';

async function bootstrap(job: JobPro) {
  const app = await NestFactory.createApplicationContext(JobProcessorModule);
  const jobProcessorService = app.get(JobProcessorService);

  await jobProcessorService.processJob(job);
  await app.close();
}
export default bootstrap;

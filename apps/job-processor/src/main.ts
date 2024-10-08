import { NestFactory } from '@nestjs/core';
import { JobProcessorModule } from './job-processor.module';
import { JobPro } from '@taskforcesh/bullmq-pro';
import { JobProcessorService } from './job-processor.service';

async function bootstrap(job: JobPro) {
  const app = await NestFactory.createApplicationContext(JobProcessorModule);

  // factory.get()
  const jobProcessorService = app.get(JobProcessorService);

  const result = await jobProcessorService.processJob(job);
  await app.close();
  return result;
}
export default bootstrap;

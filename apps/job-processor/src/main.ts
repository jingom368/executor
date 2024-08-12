import { NestFactory } from '@nestjs/core';
import { JobExecutorModule } from './job-executor.module';

async function bootstrap() {
  const app = await NestFactory.create(JobExecutorModule);
  await app.listen(3000);
}
bootstrap();

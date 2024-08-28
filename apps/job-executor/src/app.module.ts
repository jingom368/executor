import { Module } from '@nestjs/common';
import { JobConsumerModule } from './worker/job-consumer.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [JobConsumerModule, S3Module],
  controllers: [],
  providers: [],
})
export class AppModule {}

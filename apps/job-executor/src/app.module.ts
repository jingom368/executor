import { Module } from '@nestjs/common';
import { JobConsumerModule } from './worker/job-consumer.module';

@Module({
  imports: [JobConsumerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

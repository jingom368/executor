import { JobProducerModule } from '@job-producer/job-producer.module';
import { Module } from '@nestjs/common';
import { JobWorkerService } from './job-consumer.worker.service';

@Module({
  imports: [JobProducerModule],
  controllers: [],
  providers: [JobWorkerService],
})
export class JobConsumerModule {}

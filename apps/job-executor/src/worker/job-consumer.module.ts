import { JobProducerModule } from '@job-producer/job-producer.module';
import { Module } from '@nestjs/common';
import { GroupWorkerService } from './job-consumer.group.worker.service';
import { ChildWorkerService } from './job-consumer.child.worker.service';

@Module({
  imports: [JobProducerModule],
  controllers: [],
  providers: [ChildWorkerService, GroupWorkerService],
})
export class JobConsumerModule {}

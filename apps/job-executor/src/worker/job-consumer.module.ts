import { JobProducerModule } from 'apps/job-api/src/job-producer.module';
import { Module } from '@nestjs/common';
import { GroupWorkerService } from './job-consumer.group.worker.service';
import { ChildWorkerService } from './job-consumer.child.worker.service';
import { S3Module } from '@job-executor/s3/s3.module';
import { UtilModule } from '@job-executor/util/util.module';
import { ServiceModule } from '@job-executor/services/service.module';

@Module({
  imports: [JobProducerModule, S3Module, UtilModule, ServiceModule],
  controllers: [],
  providers: [ChildWorkerService, GroupWorkerService],
})
export class JobConsumerModule {}

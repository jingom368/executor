import { Module } from '@nestjs/common';
import { BullModule } from '@taskforcesh/nestjs-bullmq-pro';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { JobProducerController } from './job-producer.controller';
import { QueueType } from './job-type/queue/queue.type';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity } from './job-type/entity/job.entity';
import { JobEntitySchema } from './job-type/schema/job.schema';
import { JobProducerRepository } from './job-producer.repository';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JobProfile } from './mapper/job.profile';
import { JobGroupService } from './job-producer.group.service';
import { JobGroupFactory } from './mapper/job.factory';
import { JobQueueService } from './job-producer.queue';
import { JobRepositoryUtil } from './util/job-producer.repository.util';
import { HttpModule } from '@nestjs/axios';
import { DesignApiService } from './api/design.api.service';

const queueRegistrations = Object.values(QueueType).map((queueName) => ({
  name: queueName,
}));

const bullBoardFeatures = Object.values(QueueType).map((queueName) => ({
  name: queueName,
  adapter: BullMQAdapter,
}));

@Module({
  imports: [
    HttpModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://jujang:y2lvHGXxLwFnjWUA@cluster0.ftxaquc.mongodb.net',
    ),
    MongooseModule.forFeature([
      { name: JobEntity.name, schema: JobEntitySchema },
    ]),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(...queueRegistrations),
    ...bullBoardFeatures.map((feature) => BullBoardModule.forFeature(feature)),
    BullModule.registerQueue({
      name: 'jobQueue',
    }),
    BullModule.registerFlowProducer({
      name: 'flowProducerName',
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'jobQueue',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [JobProducerController],
  providers: [
    JobGroupService,
    JobProducerRepository,
    JobQueueService,
    JobProfile,
    JobGroupFactory,
    JobRepositoryUtil,
    DesignApiService,
  ],
  exports: [JobProducerRepository],
})
export class JobProducerModule {}

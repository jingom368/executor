import { Module } from '@nestjs/common';
import { BullModule } from '@taskforcesh/nestjs-bullmq-pro';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { JobProducerController } from './job-producer.controller';
import { QueueType } from './model/enum/queue.type';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity } from './model/job/entity/job.entity';
import { JobEntitySchema } from './model/job/entity/schema/job.schema';
import { JobProducerRepository } from './job-producer.repository';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JobProfile } from './mapper/job.profile';
import { JobGroupPayloadFactory } from './factory/job.group.payload.factory';
import { JobQueueService } from './job-producer.queue';
import { JobRepositoryUtil } from './util/job-producer.repository.util';
import { JobRequestPayloadFactory } from './factory/job.request.payload.factory';

const queueRegistrations = Object.values(QueueType).map((queueName) => ({
  name: queueName,
}));

const bullBoardFeatures = Object.values(QueueType).map((queueName) => ({
  name: queueName,
  adapter: BullMQAdapter,
}));

@Module({
  imports: [
    // 큐 등록
    BullModule.registerQueue(...queueRegistrations),

    // 큐 보드 등록
    ...bullBoardFeatures.map((feature) => BullBoardModule.forFeature(feature)),

    // 큐 flow 프로듀서 등록
    BullModule.registerFlowProducer({
      name: 'flowProducerName',
    }),

    // BullMQ 연결 설정
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // Bull 보드 설정
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),

    // Autumapper 모듈 등록
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),

    // mongoose 모듈 등록
    MongooseModule.forRoot(
      'mongodb+srv://jujang:y2lvHGXxLwFnjWUA@cluster0.ftxaquc.mongodb.net',
    ),

    // mongoose 스키마 등록
    MongooseModule.forFeature([
      { name: JobEntity.name, schema: JobEntitySchema },
    ]),
  ],
  controllers: [JobProducerController],
  providers: [
    JobProducerRepository,
    JobQueueService,
    JobProfile,
    JobRepositoryUtil,
    JobRequestPayloadFactory,
    JobGroupPayloadFactory,
  ],
  exports: [JobProducerRepository],
})
export class JobProducerModule {}

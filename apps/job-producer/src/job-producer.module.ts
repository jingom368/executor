import { Module } from '@nestjs/common';
import { BullModule } from '@taskforcesh/nestjs-bullmq-pro';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { JobProducerController } from './job-producer.controller';
import { JobProducerService } from './job-producer.service';
import { QueueAndJobType } from './enums';
import { PayloadMapper } from './mapper/job.payload.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity } from './job-type/job.entity';
import { JobEntitySchema } from './job-type/job.schema';
import { JobProducerRepository } from './job-producer.repository';
import { EntityMapper } from './mapper/job.entity.mapper';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JobProfile } from './mapper/job.profile';

const queueRegistrations = Object.values(QueueAndJobType).map((queueName) => ({
  name: queueName,
}));

const bullBoardFeatures = Object.values(QueueAndJobType).map((queueName) => ({
  name: queueName,
  adapter: BullMQAdapter,
}));

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://jujang:2oV4VItJZB7MnJEA@cluster0.ftxaquc.mongodb.net',
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
    JobProducerService,
    PayloadMapper,
    EntityMapper,
    JobProducerRepository,
    JobProfile,
  ],
})
export class JobProducerModule {}

import { JobProducerModule } from 'apps/job-api/src/job-producer.module';
import { Module } from '@nestjs/common';
import { GroupWorkerService } from './job-consumer.group.worker.service';
import { ImageRenderingChildWorkerService } from './job-consumer.image.child.worker.service';
import { S3Module } from '@job-executor/s3/s3.module';
import { UtilModule } from '@job-executor/util/util.module';
import { ServiceModule } from '@job-executor/services/service.module';
import { GroupJobFactory } from '@job-executor/factory/job.group.factory';
import { ChildJobFactory } from '@job-executor/factory/job.child.factory';
import { ImageRenderingChildJobHandler } from '@job-executor/handler/image/image-rendering.job.child.handler';

import { PdfRenderingChildJobHandler } from '@job-executor/handler/pdf/pdf-rendering.job.child.handler';
import { ImageRenderingGroupJobHandler } from '@job-executor/handler/image/image-rendering.job.group.handler';
import { PdfRenderingGroupJobHandler } from '@job-executor/handler/pdf/pdf-rendering.job.group.handler';
import { PdfRenderingChildWorkerService } from './job-consumer.pdf.child.worker.service';

@Module({
  imports: [JobProducerModule, S3Module, UtilModule, ServiceModule],
  controllers: [],
  providers: [
    ImageRenderingChildWorkerService,
    PdfRenderingChildWorkerService,
    GroupWorkerService,
    ChildJobFactory,
    GroupJobFactory,
    ImageRenderingGroupJobHandler,
    PdfRenderingGroupJobHandler,
    ImageRenderingChildJobHandler,
    PdfRenderingChildJobHandler,
  ],
})
export class JobConsumerModule {}

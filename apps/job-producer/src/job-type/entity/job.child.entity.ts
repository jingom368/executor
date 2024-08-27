import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { JobType } from '../job/job.type';
import { JobStatus } from './job.status';

@Schema()
export class ChildJobEntity {
  @Prop({ required: true })
  childJobIdx: string;

  @Prop({ required: true, enum: JobType, type: String })
  childJobType: JobType;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  childJobData: any;

  @Prop({ required: true, enum: JobStatus, type: String })
  childJobStatus: JobStatus;
}

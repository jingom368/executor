import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { JobStatus } from '../../enum/job.status';
import { ChildJobInput } from '../child/job.child.input';

@Schema()
export class ChildJobEntity {
  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  jobInput: ChildJobInput;

  @Prop({ required: true, enum: JobStatus, type: String })
  jobStatus: JobStatus;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, type: Date, default: Date.now })
  updatedAt: Date;
}

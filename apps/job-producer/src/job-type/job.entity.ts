// job.entity.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { ChildJobPayload } from './job.child.payload';
import { JobStatus } from './job.status';

@Schema()
export class JobEntity {
  @Prop({ required: true })
  jobIdx: string;

  @Prop({ required: true })
  groupIdx: string;

  @Prop({ type: [{ childJobIdx: String, jobType: String }], required: true })
  childJobs: ChildJobPayload[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true, enum: JobStatus, type: String })
  status: JobStatus;
}

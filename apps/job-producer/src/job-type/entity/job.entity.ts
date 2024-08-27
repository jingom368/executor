// job.entity.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { JobStatus } from './job.status';
import { ChildJobEntity } from './job.child.entity';

@Schema()
export class JobEntity {
  @Prop({ required: true })
  jobIdx: string;

  @Prop({ required: true })
  groupIdx: string;

  @Prop({
    type: [ChildJobEntity], // ChildJobEntity 사용
    required: true,
  })
  childJobs: ChildJobEntity[];

  @Prop({ required: true, enum: JobStatus, type: String })
  status: JobStatus;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

// job.schema.ts
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { JobEntity } from '../entity/job.entity';

export type JobEntityDocument = HydratedDocument<JobEntity>;

export const JobEntitySchema = SchemaFactory.createForClass(JobEntity);

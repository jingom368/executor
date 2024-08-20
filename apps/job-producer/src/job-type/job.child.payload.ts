import { IsEnum, IsObject, IsString } from 'class-validator';
import { JobType } from './job.type';

export class ChildJobPayload {
  @IsString()
  childJobIdx: string;

  @IsEnum(JobType)
  jobType: JobType;

  @IsObject()
  jobData: any; // 어떤 객체든 올 수 있게 any 타입 사용
}

import { IsEnum, IsObject, IsString } from 'class-validator';
import { JobType } from '../job/job.type';

export class ChildJobPayload {
  @IsString()
  childJobIdx: string;

  @IsEnum(JobType)
  childJobType: JobType;

  @IsObject()
  childJobData: any; // 어떤 객체든 올 수 있게 any 타입 사용
}

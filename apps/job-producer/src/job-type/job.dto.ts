import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { JobType } from './job.type';

export class JobDto {
  @IsString()
  @IsNotEmpty()
  designIdx: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  pages: string[];

  @IsString()
  @IsNotEmpty()
  processType: JobType;
}

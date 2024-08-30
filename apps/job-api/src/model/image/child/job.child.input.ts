import { JobType } from '@job-api/model/enum/job.type';
import { Dimension } from '@job-api/model/image/request/image-rendering.job.request';
import { ChildJobInput } from '@job-api/model/job/child/job.child.input';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ImageRenderingchildJobInput extends ChildJobInput {
  @IsEnum(JobType)
  public jobType: JobType;

  @IsNumber()
  public designIndex: number;

  @IsString()
  public designName: string;

  @IsString()
  public extension: string;

  @Type(() => Dimension)
  public docSize: Dimension;

  public page: number;
}

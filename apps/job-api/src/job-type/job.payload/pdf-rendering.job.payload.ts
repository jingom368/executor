import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsEnum,
} from 'class-validator';
import { JobPayload } from './job.payload';
import { JobType } from '../job/job.type';
import { Dimension } from './image-rendering.job.payload';

export class PdfRenderingJobPayload extends JobPayload {
  @IsEnum(JobType)
  public jobType: JobType;

  @IsBoolean()
  public backgroundTransparent: boolean;

  @IsNumber()
  public designHistoryIndex: number;

  @IsNumber()
  public designIndex: number;

  @IsString()
  public designName: string;

  @Type(() => Dimension)
  public docSize: Dimension;

  @IsNumber()
  public dpi: number;

  @IsString()
  public extension: string;

  @IsBoolean()
  public imgCombine: boolean;

  @IsString()
  public measure: string;

  @IsArray()
  @IsNumber({}, { each: true })
  public pageIdxList: number[];

  @IsBoolean()
  public zip: boolean;
}

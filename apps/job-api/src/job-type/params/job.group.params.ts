import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { JobType } from '../job/job.type';
import { Type } from 'class-transformer';
import { Dimension } from '../job.payload/image-rendering.job.payload';

export class JobGroupParams {
  @IsString()
  public jobType: JobType;

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
  public measure: string;

  @IsBoolean()
  public imgCombine: boolean;

  @IsString()
  public extension: string;

  @IsArray()
  @IsNumber({}, { each: true })
  public pageIdxList: number[];

  @IsBoolean()
  public zip: boolean;
}

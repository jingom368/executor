import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { JobType } from '../job/job.type';

export class JobGroupParams {
  @IsString()
  public jobType: JobType;

  @IsNumber()
  public designHistoryIndex: number;

  @IsNumber()
  public designIndex: number;

  @IsString()
  public designName: string;

  @IsString()
  public docSize: string;

  @IsNumber()
  public dpi: number;

  @IsString()
  public measure: string;

  @IsBoolean()
  public imgCombine: boolean;

  @IsString()
  public extension: string;

  @IsString()
  public pages: string;

  @IsBoolean()
  public zip: boolean;
}

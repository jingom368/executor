import { JobRequestPayload } from '../../job/request/job.request';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class Dimension {
  width: number;
  height: number;
}

export class ImageRenderingJobRequestPayload extends JobRequestPayload {
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
  public rasterize: boolean;

  @IsBoolean()
  public zip: boolean;
}

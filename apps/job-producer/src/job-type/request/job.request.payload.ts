import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class JobRequestPayload {
  @IsBoolean()
  public backgroundTransparent: boolean;

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
  public extension: string;

  @IsBoolean()
  public imgCombine: boolean;

  @IsString()
  public measure: string;

  @IsString()
  public pages: string;

  @IsBoolean()
  public zip: boolean;
}

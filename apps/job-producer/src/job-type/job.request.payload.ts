import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class JobRequestPayload {
  @IsNumber()
  public backgroundOpacity: number;

  @IsNumber()
  public designHistoryIndex: number;

  @IsNumber()
  public designIndex: number;

  @IsString()
  public designname: string;

  @IsString()
  public docSize: string;

  @IsNumber()
  public dpi: number;

  @IsString()
  public extension: string;

  @IsBoolean()
  public imgCombine: boolean;

  @IsBoolean()
  public includePageLink: boolean;

  @IsString()
  public measure: string;

  @IsString()
  public pages: string;

  @IsBoolean()
  public rasterize: boolean;

  @IsBoolean()
  public zip: boolean;
}

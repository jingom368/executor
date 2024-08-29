import { Dimension } from '../../job.payload/image-rendering.job.payload';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class childJobInput {
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

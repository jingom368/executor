import { Dimension } from 'apps/job-api/src/job-producer.group.service';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class JobQueueChildData {
  @IsNumber()
  public designIndex: number;

  @IsString()
  public designName: string;

  @IsString()
  public extension: string;

  @Type(() => Dimension)
  public dimension: Dimension;
}

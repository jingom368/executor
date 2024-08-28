import { IsNumber, IsString } from 'class-validator';

export class JobQueueChildData {
  @IsNumber()
  public designIndex: number;

  @IsString()
  public designName: string;

  @IsString()
  public extension: string;
}

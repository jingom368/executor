import { IsBoolean } from 'class-validator';

export class JobQueueData {
  @IsBoolean()
  public imgCombine: boolean;

  @IsBoolean()
  public zip: boolean;
}

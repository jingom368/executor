import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class JobDto {
  @IsString()
  @IsNotEmpty()
  designIdx: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  pages: string[];

  @IsString()
  @IsNotEmpty()
  processType: string;
}

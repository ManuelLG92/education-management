import { ArrayMinSize, IsDateString, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsString()
  name: string;

  @IsString()
  schoolId: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @ArrayMinSize(1)
  coursesId: string[];
}

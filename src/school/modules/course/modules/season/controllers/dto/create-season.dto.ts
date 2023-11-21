import { IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsString()
  name: string;

  schoolId: string;

  startAt: Date;

  endAt: Date;

  coursesId: string[];
}

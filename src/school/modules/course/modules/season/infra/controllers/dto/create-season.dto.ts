import { IsString } from 'class-validator';
import { School } from '../../../../../../../domain/school';
import { Type } from 'class-transformer';
import { CourseRepository } from '../../../../../infra/persistence/course.repository';

export class CreateSeasonDto {
  @IsString()
  name: string;

  school: School;

  startAt: Date;

  endAt: Date;

  @Type(() => CourseRepository)
  courses: ReadonlyArray<CourseRepository>;
}

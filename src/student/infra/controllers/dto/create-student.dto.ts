import { CreatePersonDto } from '../../../../person/create-person.dto';
import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto extends CreatePersonDto {
  @IsNumber()
  age: number;

  @IsString()
  level: string;

  @IsString()
  schoolId: string;
}

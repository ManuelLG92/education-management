import { CreatePersonDto } from '../../../../../create-person.dto';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsString()
  level: string;

  @IsString()
  schoolId: string;

  @ValidateNested()
  @IsObject()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}

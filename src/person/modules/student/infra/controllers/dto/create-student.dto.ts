import { CreatePersonDto } from '../../../../../create-person.dto';
import {
  IsArray,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SectionRepository } from 'src/school/modules/course/modules/section/infra/persistence/section.repository';

interface IStudentDto {
  schoolId: string;
  parentsId: Array<string>;
  sectionId: string;
}
export class CreateStudentDto extends CreatePersonDto implements IStudentDto {
  @IsString()
  @ApiProperty()
  schoolId: string;

  @ValidateNested()
  @IsObject()
  @Type(() => CreatePersonDto)
  @ApiProperty()
  person: CreatePersonDto;

  @ValidateNested({ each: true })
  @Type(() => CreatePersonDto)
  section: SectionRepository;

  @IsUUID('4')
  sectionId: string;

  @IsUUID('4')
  @IsArray({ each: true })
  parentsId: Array<string>;
}

import { CreatePersonDto } from '../../../../../create-person.dto';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
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

  @ValidateNested({ each: true })
  @Type(() => ParentDto)
  @IsArray()
  @IsOptional()
  parents: ReadonlyArray<ParentDto> = [];
}

export class ParentDto {
  @IsString()
  schoolId: string;

  @ValidateNested()
  @IsObject()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;
}

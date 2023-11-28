import {
  IsArray,
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSectionDto {
  @IsString()
  name: string;

  @IsString()
  @IsDefined()
  courseId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  studentIds: string[] = [];
}

export class QueryDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  like?: string;
}

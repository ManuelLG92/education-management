import { CreatePersonDto } from '../../../../request-dto/create-person.dto';
import { IsString } from 'class-validator';

export class CreateTeacherDto extends CreatePersonDto {
  @IsString()
  schoolId: string;
}

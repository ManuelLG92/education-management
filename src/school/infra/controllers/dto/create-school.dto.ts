import { IsObject, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../../../person/create-person.dto';
import { Type } from 'class-transformer';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsObject()
  address: AddressDto;
}

import {
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  street: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsPositive()
  cp: number;
  @IsString()
  country: string;
}
export class CreatePersonDto {
  @IsString()
  name: string;

  @IsPositive()
  age: number;

  @ValidateNested()
  @IsObject()
  @Type(() => AddressDto)
  address: AddressDto;
}

import {
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @IsString()
  @ApiProperty()
  street: string;
  @IsString()
  @ApiProperty()
  state: string;
  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  postalCode: string;
  @IsString()
  @ApiProperty()
  country: string;
}
export class CreatePersonDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsPositive()
  @ApiProperty()
  age: number;

  @ValidateNested()
  @IsObject()
  @Type(() => AddressDto)
  @ApiProperty()
  address: AddressDto;
}

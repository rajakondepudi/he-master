import { IsNotEmpty, IsOptional, MaxLength, IsString, IsNumber } from '@nestjs/class-validator';
import { Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ERROR_MESSAGE } from './../../../constants';
import { ApiProperty } from '@nestjs/swagger';
export class PinCodeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @Matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, { message: ERROR_MESSAGE.INVALID_PINCODE })
  PINCODE: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  PINCODE_NAME: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  CITY_ID: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(10)
  @IsNumber()
  SEQ_NUM: string;
}

import { IsNotEmpty, IsOptional, MaxLength, IsString, IsNumber } from '@nestjs/class-validator';
import { Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ERROR_MESSAGE } from './../../../constants';
export class PinCodeDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @Matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, { message: ERROR_MESSAGE.INVALIDPIN })
  PINCODE: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  PINCODE_NAME: string;

  @IsNotEmpty()
  @IsNumber()
  CITY_ID: string;

  @IsOptional()
  @MaxLength(10)
  @IsNumber()
  SEQ_NUM: string;
}

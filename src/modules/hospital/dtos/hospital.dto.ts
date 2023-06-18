import { IsNotEmpty, IsOptional, MaxLength, IsString, IsEmail } from '@nestjs/class-validator';
import { Matches, IsNumber, IsDecimal, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ERROR_MESSAGE } from './../../../constants';
export class HospitalDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  HOSPITAL_NAME: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  HOSPITAL_TYPE: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  ADDRESS: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @Matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, { message: ERROR_MESSAGE.INVALID_PINCODE })
  PINCODE: number;

  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  EMAILID: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  WEBSITE: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  PHONE: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  FAX: string;

  @IsOptional()
  @IsNumberString()
  @IsDecimal()
  LATITUDE: number;

  @IsOptional()
  @IsNumberString()
  @IsDecimal()
  LONGITUDE: number;
}

import { IsNotEmpty, IsOptional, MaxLength, IsString, IsEmail } from '@nestjs/class-validator';
import { Matches, IsNumber, IsDecimal, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ERROR_MESSAGE } from './../../../constants';
import { ApiProperty } from '@nestjs/swagger';
export class HospitalDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  HOSPITAL_NAME: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  HOSPITAL_TYPE: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  ADDRESS: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @Matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, { message: ERROR_MESSAGE.INVALID_PINCODE })
  PINCODE: number;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  EMAILID: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  WEBSITE: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  PHONE: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  FAX: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @IsDecimal()
  LATITUDE: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @IsDecimal()
  LONGITUDE: number;
}

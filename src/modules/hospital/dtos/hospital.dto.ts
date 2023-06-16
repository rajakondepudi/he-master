import { IsNotEmpty, IsOptional, MaxLength, IsString, IsEmail } from '@nestjs/class-validator';
import { Matches, IsNumber, IsDecimal } from 'class-validator';
import { Transform } from 'class-transformer';
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
  @Matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, { message: 'Invalid PIN code. It should be a 6-digit number.' })
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
  @IsNumber()
  @IsDecimal()
  LATITUDE: number;

  @IsOptional()
  @IsNumber()
  @IsDecimal()
  LONGITUDE: number;
}

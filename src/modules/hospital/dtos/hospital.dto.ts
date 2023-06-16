import { IsNotEmpty, IsOptional, MaxLength, IsString, IsEmail, Min, Max } from '@nestjs/class-validator';

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
  @Min(100000)
  @Max(999999)
  PINCODE: number;

  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  EMAILID: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  WEBSITE: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  FAX: string;

  @IsOptional()
  CITY_ID: number;

  @IsOptional()
  STATE_ID: number;

  @IsOptional()
  LATITUDE: string;

  @IsOptional()
  LONGITUDE: string;
}

import { IsNotEmpty, IsOptional, MaxLength, IsString, IsNumber, Min, Max } from '@nestjs/class-validator';

export class PinCodeDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(100000)
  @Max(999999)
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

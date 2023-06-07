import { IsNotEmpty, IsOptional, MinLength, MaxLength, IsNumberString, IsString } from '@nestjs/class-validator';

export class PinCodeDTO {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @IsNumberString()
  PINCODE: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  PINCODE_NAME: string;

  @IsOptional()
  @IsNumberString()
  CITY_ID: string;

  @IsOptional()
  @MaxLength(10)
  @IsNumberString()
  SEQ_NUM: string;
}

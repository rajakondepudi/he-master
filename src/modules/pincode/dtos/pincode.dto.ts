import { IsNotEmpty, IsOptional, MaxLength, IsNumberString, IsString } from '@nestjs/class-validator';

export class PinCodeDTO {
  @IsNotEmpty()
  PINCODE: number;

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

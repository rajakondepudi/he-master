import { IsNotEmpty, IsOptional, MaxLength, IsString, IsNumber } from '@nestjs/class-validator';

export class CommonKeysDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  TABLE_NAME: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  KEY: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  VALUE: string;

  @IsOptional()
  @IsNumber()
  PARENT_ID: number;

  @IsOptional()
  @IsNumber()
  SEQ_NUM: number;
}

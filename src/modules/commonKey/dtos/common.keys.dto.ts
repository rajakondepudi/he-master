import { IsNotEmpty, IsOptional, MaxLength, IsString, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
export class CommonKeysDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_ -]{2,30}$/)
  @MaxLength(30)
  TABLE_NAME: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  KEY: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  VALUE: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  PARENT_ID: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  SEQ_NUM: number;
}

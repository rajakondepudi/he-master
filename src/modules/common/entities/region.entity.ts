import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity('REGION_M')
export class Region extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  REGION_ID: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  REGION_CODE: string;

  @ApiProperty()
  @Column({ nullable: true })
  REGION_NAME: string;

  @ApiProperty()
  @Column({ nullable: true })
  SEQ_NUM: number;
}

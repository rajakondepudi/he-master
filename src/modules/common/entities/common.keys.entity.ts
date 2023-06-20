import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity('COMMON_M')
export class CommonKeys extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  KEY_ID: number;

  @ApiProperty()
  @Column({ nullable: false })
  TABLE_NAME: string;

  @ApiProperty()
  @Column({ nullable: false })
  KEY: string;

  @ApiProperty()
  @Column({ nullable: false })
  VALUE: string;

  @ApiProperty()
  @Column({ nullable: true })
  PARENT_ID: number;

  @ApiProperty()
  @Column({ nullable: true })
  SEQ_NUM: number;
}

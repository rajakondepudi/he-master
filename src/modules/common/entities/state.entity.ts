import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity('STATE_M')
export class State extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  STATE_ID: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  STATE_CODE: string;

  @ApiProperty()
  @Column({ nullable: false })
  STATE_NAME: string;

  @ApiProperty()
  @Column({ nullable: true })
  GC_STATE_NANE: string;

  @ApiProperty()
  @Column({ nullable: true })
  SEQ_NUM: number;
}

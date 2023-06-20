import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { State } from './state.entity';
import { Region } from './region.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('CITY_M')
export class City extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  CITY_ID: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  CITY_NAME: string;

  @ApiProperty()
  @Column({ nullable: true })
  GC_CITY_NAME: string;

  @ApiProperty()
  @ManyToOne(() => Region)
  @JoinColumn({ name: 'REGION_CODE', referencedColumnName: 'REGION_CODE' })
  @Column({ nullable: true })
  REGION_CODE: string;

  @ApiProperty()
  @ManyToOne(() => State)
  @JoinColumn({ name: 'STATE_CODE', referencedColumnName: 'STATE_CODE' })
  @Column({ nullable: false })
  STATE_CODE: string;

  @ApiProperty()
  @Column({ nullable: true })
  SEQ_NUM: number;
}

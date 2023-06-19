import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { State } from './state.entity';
import { Region } from './region.entity';
@Entity('CITY_M')
export class City extends Base {
  @PrimaryGeneratedColumn()
  CITY_ID: number;

  @Column({ unique: true, nullable: false })
  CITY_NAME: string;

  @Column({ nullable: true })
  GC_CITY_NAME: string;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'REGION_CODE', referencedColumnName: 'REGION_CODE' })
  @Column({ nullable: true })
  REGION_CODE: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'STATE_CODE', referencedColumnName: 'STATE_CODE' })
  @Column({ nullable: false })
  STATE_CODE: string;

  @Column({ nullable: true })
  SEQ_NUM: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { State } from './state.entity';

@Entity()
export class City extends Base {
  @PrimaryGeneratedColumn()
  CITY_ID: number;

  @Column({ unique: true, nullable: false })
  CITY_NAME: string;

  @Column({ nullable: true })
  GC_CITY_NAME: string;

  @Column({ nullable: true })
  REGION_CODE: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'STATE_CODE', referencedColumnName: 'STATE_CODE' })
  @Column({ nullable: false })
  STATE_CODE: string;

  @Column({ nullable: true })
  SEQ_NUM: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity('REGION_M')
export class Region extends Base {
  @PrimaryGeneratedColumn()
  REGION_ID: number;

  @Column({ unique: true, nullable: false })
  REGION_CODE: string;

  @Column({ nullable: true })
  REGION_NAME: string;

  @Column({ nullable: true })
  SEQ_NUM: number;
}

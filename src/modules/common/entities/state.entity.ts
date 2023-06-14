import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class State extends Base {
  @PrimaryGeneratedColumn()
  STATE_ID: number;

  @Column({ unique: true, nullable: false })
  STATE_CODE: string;

  @Column({ nullable: false })
  STATE_NAME: string;

  @Column({ nullable: true })
  GC_STATE_NANE: string;

  @Column({ nullable: true })
  SEQ_NUM: number;
}

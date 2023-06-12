import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class CommonKeys extends Base {
  @PrimaryGeneratedColumn()
  KEY_ID: number;

  @Column({ nullable: false })
  TABLE_NAME: string;

  @Column({ nullable: false })
  KEY: string;

  @Column({ nullable: false })
  VALUE: string;

  @Column({ nullable: true })
  PARENT_ID: number;

  @Column({ nullable: true })
  SEQ_NUM: number;
}

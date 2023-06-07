import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';
@Entity()
export class PinCode extends Base {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ unique: true })
  PINCODE: number;

  @Column({ nullable: true })
  PINCODE_NAME: string;

  @Column({ nullable: true })
  CITY_ID: number;

  @Column({ nullable: true })
  SEQ_NUM: string;
}

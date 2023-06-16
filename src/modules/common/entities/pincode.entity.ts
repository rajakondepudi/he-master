import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { City } from './city.entity';
@Entity('PINCODE_M')
export class PinCode extends Base {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ unique: true })
  PINCODE: number;

  @Column({ nullable: true })
  PINCODE_NAME: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'CITY_ID', referencedColumnName: 'CITY_ID' })
  @Column({ nullable: false })
  CITY_ID: number;

  @Column({ nullable: true })
  SEQ_NUM: string;
}

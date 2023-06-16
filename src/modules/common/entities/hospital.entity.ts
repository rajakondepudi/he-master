import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { PinCode } from './pincode.entity';
@Entity()
export class Hospital extends Base {
  @PrimaryGeneratedColumn()
  HOSPITAL_ID: number;

  @Column({ unique: true, nullable: false })
  HOSPITAL_NAME: string;

  @Column({ nullable: true })
  HOSPITAL_TYPE: string;

  @Column({ unique: true, nullable: false })
  ADDRESS: string;

  @ManyToOne(() => PinCode)
  @JoinColumn({ name: 'PINCODE', referencedColumnName: 'PINCODE' })
  @Column({ nullable: false })
  PINCODE: number;

  @Column({ nullable: true })
  CITY_ID: number;

  @Column({ nullable: true })
  STATE_ID: number;

  @Column({ nullable: true, type: 'float' })
  LATITUDE: number;

  @Column({ nullable: true, type: 'float' })
  LONGITUDE: number;

  @Column({ nullable: true, unique: true })
  EMAILID: string;

  @Column({ nullable: true, unique: true })
  WEBSITE: string;

  @Column({ nullable: false, unique: true })
  PHONE: string;

  @Column({ nullable: true })
  FAX: string;
}

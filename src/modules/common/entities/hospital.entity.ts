import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from './base.entity';
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

  @Column({ nullable: false })
  PINCODE: string;

  @Column({ nullable: true })
  CITY_ID: number;

  @Column({ nullable: true })
  STATE_ID: number;

  @Column({ nullable: true })
  LATITUDE: string;

  @Column({ nullable: true })
  LONGITUDE: string;

  @Column({ nullable: true, unique: true })
  EMAILID: string;

  @Column({ nullable: true, unique: true })
  WEBSITE: string;

  @Column({ nullable: false, unique: true })
  PHONE: string;

  @Column({ nullable: true })
  FAX: string;
}

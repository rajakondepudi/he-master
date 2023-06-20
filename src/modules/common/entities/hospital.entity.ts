import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { PinCode } from './pincode.entity';


@Entity('HOSPITAL_M')
export class Hospital extends Base {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  HOSPITAL_ID: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  HOSPITAL_NAME: string;

  @ApiProperty()
  @Column({ nullable: true })
  HOSPITAL_TYPE: string;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  ADDRESS: string;

  @ApiProperty()
  @ManyToOne(() => PinCode)
  @JoinColumn({ name: 'PINCODE', referencedColumnName: 'PINCODE' })
  @Column({ nullable: false })
  PINCODE: number;

  @ApiProperty()
  @Column({ nullable: true, type: 'float' })
  LATITUDE: number;

  @ApiProperty()
  @Column({ nullable: true, type: 'float' })
  LONGITUDE: number;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  EMAILID: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  WEBSITE: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  PHONE: string;

  @ApiProperty()
  @Column({ nullable: true })
  FAX: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { City } from './city.entity';
@Entity('PINCODE_M')
export class PinCode extends Base {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  ID: number;

  @ApiProperty()
  @Column({ unique: true })
  PINCODE: number;

  @ApiProperty()
  @Column({ nullable: true })
  PINCODE_NAME: string;

  @ApiProperty()
  @ManyToOne(() => City)
  @JoinColumn({ name: 'CITY_ID', referencedColumnName: 'CITY_ID' })
  @Column({ nullable: false })
  CITY_ID: number;

  @ApiProperty()
  @Column({ nullable: true })
  SEQ_NUM: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @ApiProperty()
  @Column({ nullable: true })
  CREATED_BY: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CREATED_DATETIME: Date;

  @ApiProperty()
  @Column({ nullable: true })
  UPDATED_BY: string;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UPDATED_DATETIME: Date;

  @ApiProperty()
  @Column({ nullable: true })
  EFFECTIVE_DATE: Date;

  @ApiProperty()
  @Column({ nullable: true })
  EXPIRED_DATE: Date;

  @ApiProperty()
  @Column({ nullable: true })
  IS_ACTIVE: number;
}

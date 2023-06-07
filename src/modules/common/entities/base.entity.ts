import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @Column({ nullable: true })
  CREATED_BY: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CREATED_DATETIME: Date;

  @Column({ nullable: true })
  UPDATED_BY: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UPDATED_DATETIME: Date;

  @Column({ nullable: true })
  EFFECTIVE_DATE: Date;

  @Column({ nullable: true })
  EXPIRED_DATE: Date;

  @Column({ nullable: true })
  IS_ACTIVE: number;
}

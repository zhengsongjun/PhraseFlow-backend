import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id' })
  id!: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '创建时间' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '更新时间' })
  updatedAt!: Date;

  @Column({ name: 'created_by', nullable: true })
  @ApiProperty({ description: '创建人' })
  createdBy?: string;

  @Column({ name: 'updated_by', nullable: true })
  @ApiProperty({ description: '更新人' })
  updatedBy?: string;
}

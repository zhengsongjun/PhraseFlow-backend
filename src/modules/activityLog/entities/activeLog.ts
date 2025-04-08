import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('activity_logs')
export class ActiveLog extends BaseEntity {
  @Column()
  @ApiProperty({ description: '用户id' })
  userId: string;

  @Column()
  @ApiProperty({ description: '页面' })
  page: string;

  @Column({ type: 'datetime' })
  @ApiProperty({ description: '开始时间' })
  startTime: Date;

  @Column()
  @ApiProperty({ description: '持续时间' })
  duration: number; // 单位：秒
}

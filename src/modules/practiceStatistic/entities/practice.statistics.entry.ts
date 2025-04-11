import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice_statistics')
export class PracticeStatistic extends BaseEntity {
  @Column()
  @ApiProperty({ description: '文章ID' })
  articleId: string;

  @Column()
  @ApiProperty({ description: '用户id' })
  userId: string;

  @Column({ default: 0 })
  @ApiProperty({ description: '文章统计次数' })
  practiceCount: number;

  @Column()
  @ApiProperty({ description: '类型 smart | article' })
  type: string;
}

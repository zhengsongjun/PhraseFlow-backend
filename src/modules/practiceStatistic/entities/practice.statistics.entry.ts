import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('practice_statistics')
export class PracticeStatistic extends BaseEntity {
  @Column()
  articleId: string;

  @Column()
  userId: string;

  @Column({ default: 0 })
  practiceCount: number;
}

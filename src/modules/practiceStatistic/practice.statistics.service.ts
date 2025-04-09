import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PracticeStatistic } from './entities/practice.statistics.entry';
import { Repository } from 'typeorm';
import { UpdatePracticeDto } from '../article/dto/update-practice.dto';
import { UpdatePracticeStatistics } from './dto/update-practice-statistics.dto';

@Injectable()
export class PracticeStatisticsService {
  constructor(
    @InjectRepository(PracticeStatistic)
    private readonly repo: Repository<PracticeStatistic>
  ) {}

  async update(userId: string, articleId: string) {
    const article = await this.repo.findOneBy({
      userId: userId,
      articleId: articleId,
    });

    if (!article) {
      const newStat = this.repo.create({
        articleId: articleId,
        userId: userId, // ✅ 确保这不是 undefined/null
        practiceCount: 0,
      });
      return await this.repo.save(newStat); // ✅ 真正执行写入
    } else {
      article.practiceCount += 1; // 原有基础上 +1
      return await this.repo.save(article);
    }
  }

  async toUserIdAndarticleIdFindCont(userId: string, articleId: string) {
    const count = await this.repo.findOneBy({ userId, articleId });
    return count?.practiceCount || 0;
  }
}

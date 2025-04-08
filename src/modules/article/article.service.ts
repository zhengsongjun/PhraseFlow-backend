import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { PaginationResult } from '@/common/dto/pagination-result.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly repo: Repository<Article>
  ) {}

  create(dto: CreateArticleDto) {
    const article = this.repo.create(dto);

    return this.repo.save(article).catch((error) => {
      if (error.code === 'ER_DUP_ENTRY') {
        // MySQL 的唯一约束错误代码
        throw new BadRequestException('标题不能重复');
      }
      throw error; // 其他错误继续抛出
    });
  }

  async findAll(
    page: number,
    pageSize: number
  ): Promise<PaginationResult<Article>> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data, total };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}

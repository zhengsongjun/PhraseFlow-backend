import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SmartArticle } from './entities/smart-article';
import { CreateSmartActicleDto } from './dto/create-smart-article.dto';
import { Chunk } from '../chunk/entities/chunk.entity';

@Injectable()
export class SmartArticleService {
  constructor(
    @InjectRepository(SmartArticle)
    private readonly repo: Repository<SmartArticle>,

    @InjectRepository(Chunk)
    private readonly chunkRepo: Repository<Chunk>,

    private readonly dataSource: DataSource // 注入 DataSource 以支持事务
  ) {}

  async create(dto: CreateSmartActicleDto) {
    const chunk = await this.repo.create({
      ...dto,
    });
    return this.repo.save(chunk);
  }

  async update(dto: CreateSmartActicleDto) {
    const result = await this.repo.save(dto);
    return result;
  }

  async findToQuery() {
    const data = await this.repo.find();
    return {
      total: data.length,
      data,
    };
  }

  async deleteSmartArticle(id: string) {
    await this.dataSource.transaction(async (manager) => {
      // 删除文章
      await manager.getRepository(SmartArticle).delete(id);

      // 查询关联 chunk
      const chunks = await manager
        .getRepository(Chunk)
        .findBy({ smartArticleId: id });
      const ids = chunks.map((item) => item.id);

      // 删除 chunk（加上表别名防止 ambiguous 错误）
      if (ids.length > 0) {
        await manager
          .createQueryBuilder()
          .delete()
          .from(Chunk, 'chunk')
          .where('chunk.id IN (:...ids)', { ids })
          .execute();
      }
    });
  }
}

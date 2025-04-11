import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorRecordsEntity } from './entities/error.records.dto';
import { privateDecrypt } from 'crypto';
import { In, Repository } from 'typeorm';
import { CreateErrorRecordDto } from './dto/create-error-records.dto';
import { DeleteErrorRecordDto } from './dto/delete-error-records.dto';
import { Article } from '../article/entities/article.entity';
import { SmartArticle } from '../smartArticle/entities/smart-article';
import { Chunk } from '../chunk/entities/chunk.entity';

@Injectable()
export class ErrorRecordService {
  constructor(
    @InjectRepository(ErrorRecordsEntity)
    private readonly repo: Repository<ErrorRecordsEntity>,

    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,

    @InjectRepository(SmartArticle)
    private readonly smartArticleRepo: Repository<SmartArticle>,

    @InjectRepository(Chunk)
    private readonly chunkRepo: Repository<Chunk>
  ) {}

  async createErrorRecord(dto: CreateErrorRecordDto, userId: string) {
    const errorItem = await this.repo.findBy({ ...dto, userId });
    if (!errorItem) {
      return this.repo.save({ ...dto, userId });
    } else {
      throw new BadRequestException('操作错误，请勿重复添加');
    }
  }

  async getErrorRecords(userId: string) {
    const result = await this.repo.findBy({ userId });

    // 2. 分组 sourceId 和 chunkId
    const smartIds: string[] = [];
    const normalIds: string[] = [];
    const chunkIds: string[] = [];

    for (const item of result) {
      if (item.sourceType === 'smart') {
        smartIds.push(item.source);
      } else {
        normalIds.push(item.source);
      }
      if (item.chunkId) {
        chunkIds.push(item.chunkId);
      }
    }

    // 3. 批量查询相关信息
    const [smartArticles, normalArticles, chunks] = await Promise.all([
      smartIds.length > 0
        ? this.smartArticleRepo.findBy({ id: In(smartIds) })
        : [],
      normalIds.length > 0
        ? this.articleRepo.findBy({ id: In(normalIds) })
        : [],
      chunkIds.length > 0 ? this.chunkRepo.findBy({ id: In(chunkIds) }) : [],
    ]);

    // 4. 构建 Map 以便快速查找
    const articleMap = new Map<string, string>();
    smartArticles.forEach((a) => articleMap.set(a.id, a.title));
    normalArticles.forEach((a) => articleMap.set(a.id, a.title));

    const chunkMap = new Map<string, { text: string; definition: string }>();
    chunks.forEach((c) =>
      chunkMap.set(c.id, { text: c.text, definition: c.definition })
    );
    // 5. 拼装结果
    const resultList = result.map((item) => ({
      ...item,
      sourceName: articleMap.get(item.source) || null,
      title: chunkMap.get(item.chunkId)?.text || null,
      definition: chunkMap.get(item.chunkId)?.definition || null,
    }));

    // 6. 返回
    return {
      total: resultList.length,
      data: resultList,
    };
  }

  async deleteErrorRecords(dto: DeleteErrorRecordDto, userId: string) {
    return await this.repo.delete({ ...dto, userId });
  }
}

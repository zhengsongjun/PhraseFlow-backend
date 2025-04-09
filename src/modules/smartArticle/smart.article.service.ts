import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmartArticle } from './entities/smart-article';
import { CreateSmartActicleDto } from './dto/create-smart-article.dto';

@Injectable()
export class SmartArticleService {
  constructor(
    @InjectRepository(SmartArticle)
    private readonly repo: Repository<SmartArticle>
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
    const data = await this.repo.find(); // 获取所有数据
    return {
      total: data.length, // 统计总数
      data,
    };
  }
}

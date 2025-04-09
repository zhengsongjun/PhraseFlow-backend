import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SmartArticleService } from './smart.article.service';
import { CreateSmartActicleDto } from './dto/create-smart-article.dto';
import { PaginationResult } from '@/common/dto/pagination-result.dto';
import { SmartArticle } from './entities/smart-article';

@ApiTags('短文管理')
@Controller('smart-article')
export class SmartArticleController {
  constructor(private readonly service: SmartArticleService) {}

  @Get()
  @ApiOperation({ summary: '查询短文列表' })
  find(): Promise<PaginationResult<SmartArticle>> {
    return this.service.findToQuery();
  }

  @Post()
  @ApiOperation({ summary: '创建短文' })
  async reate(@Body() req: CreateSmartActicleDto) {
    console.log('创建短文', req);
    return await this.service.create({
      ...req,
    });
  }
}

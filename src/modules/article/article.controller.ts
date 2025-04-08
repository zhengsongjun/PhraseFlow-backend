import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginationResult } from '@/common/dto/pagination-result.dto';
import { Article } from './entities/article.entity';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';

@ApiTags('文章管理')
@Controller('articles')
@ApiExtraModels(Article)
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '创建文章（仅标题和内容）' })
  create(@Body() dto: CreateArticleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all users',
    type: PaginationResult, // 使用 PaginationResult
  })
  findAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10
  ): Promise<PaginationResult<Article>> {
    return this.service.findAll(+page, +pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

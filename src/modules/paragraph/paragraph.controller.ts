import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Paragraph } from './entities/paragraph.entity';

@ApiTags('段落管理')
@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly service: ParagraphService) {}

  @Post()
  @ApiOperation({ summary: '创建段落' })
  create(@Body() dto: CreateParagraphDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新段落内容或翻译' })
  update(@Param('id') id: string, @Body() dto: UpdateParagraphDto) {
    return this.service.update(id, dto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有段落' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取段落详情' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('/all/:articleId')
  @ApiResponse({
    status: 200,
    description: 'Retrieve all users',
    type: [Paragraph], // 使用 PaginationResult
  })
  @ApiOperation({ summary: '通过文章id获取所有段落' })
  toArticleIdGetParagraphList(@Param('articleId') articleId: string) {
    return this.service.toArticleIdGetParagraphList(articleId);
  }
}

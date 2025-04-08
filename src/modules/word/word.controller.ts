import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('单词管理')
@Controller('words')
export class WordController {
  constructor(private readonly service: WordService) {}

  @Post()
  @ApiOperation({ summary: '创建单词' })
  create(@Body() dto: CreateWordDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新单词信息' })
  update(@Param('id') id: string, @Body() dto: UpdateWordDto) {
    return this.service.update(id, dto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有单词' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单词详情' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

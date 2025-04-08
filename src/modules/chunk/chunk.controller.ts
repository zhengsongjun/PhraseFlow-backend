import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { CreateChunkDto } from './dto/create-chunk.dto';
import { UpdateChunkDto } from './dto/update-chunk.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Chunk } from './entities/chunk.entity';

@ApiTags('句子块管理')
@Controller('chunks')
export class ChunkController {
  constructor(private readonly service: ChunkService) {}

  @Post()
  @ApiOperation({ summary: '创建句子块' })
  create(@Body() dto: CreateChunkDto) {
    return this.service.create(dto);
  }

  @Get(':paragraphId')
  @ApiResponse({
    status: 200,
    description: 'Retrieve all users',
    type: [Chunk], // 使用 PaginationResult
  })
  @ApiOperation({ summary: '通过paragraphId查询所有块' })
  toParagraphIdFindChunks(@Param('paragraphId') paragraphId: string) {
    return this.service.toIdFindAllChunks(paragraphId);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新句子块' })
  update(@Param('id') id: string, @Body() dto: UpdateChunkDto) {
    return this.service.update(id, dto);
  }

  @Post('batch')
  @ApiOperation({ summary: '批量插入' })
  batch(@Body() dtoList: CreateChunkDto[]) {
    return this.service.batchCreate(dtoList);
  }

  @Get()
  @ApiOperation({ summary: '获取所有句子块' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取句子块详情' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

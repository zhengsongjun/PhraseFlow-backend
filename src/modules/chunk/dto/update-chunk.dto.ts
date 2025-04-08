import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateChunkDto {
  @ApiPropertyOptional({ description: '排序顺序' })
  sort?: number;

  @ApiPropertyOptional({ description: '内容' })
  text?: string;

  @ApiPropertyOptional({ description: '音标' })
  phonetic?: string;

  @ApiPropertyOptional({ description: '中文解释' })
  definition?: string;
}
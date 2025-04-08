import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWordDto {
  @ApiPropertyOptional({ description: '排序顺序' })
  sort?: number;

  @ApiPropertyOptional({ description: '单词内容' })
  text?: string;

  @ApiPropertyOptional({ description: '音标' })
  phonetic?: string;

  @ApiPropertyOptional({ description: '释义' })
  definition?: string;
}
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateParagraphDto {
  @ApiPropertyOptional({ description: '段落原文内容' })
  text?: string;

  @ApiPropertyOptional({ description: '段落翻译内容' })
  translation?: string;

  @ApiPropertyOptional({ description: '排序顺序' })
  sort?: number;
}
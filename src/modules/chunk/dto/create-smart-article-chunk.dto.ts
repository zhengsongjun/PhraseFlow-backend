import { ApiProperty } from '@nestjs/swagger';

export class CreateSmartArticleChunkDto {
  @ApiProperty({ description: '所属短文id' })
  smartArticleId: string;

  @ApiProperty({ description: '排序顺序' })
  sort: number;

  @ApiProperty({ description: '块内容（英文）' })
  text: string;

  @ApiProperty({ description: '块的音标' })
  phonetic: string;

  @ApiProperty({ description: '中文解释' })
  definition: string;
}

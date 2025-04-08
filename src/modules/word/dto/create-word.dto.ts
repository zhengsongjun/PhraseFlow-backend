import { ApiProperty } from '@nestjs/swagger';

export class CreateWordDto {
  @ApiProperty({ description: '所属句子块 ID' })
  chunkId: string;

  @ApiProperty({ description: '排序顺序' })
  sort: number;

  @ApiProperty({ description: '单词内容' })
  text: string;

  @ApiProperty({ description: '音标' })
  phonetic: string;

  @ApiProperty({ description: '释义' })
  definition: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  title: string;

  @ApiProperty({ description: '文章原文内容' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;
}
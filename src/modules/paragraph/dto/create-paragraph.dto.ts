import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class CreateParagraphDto {
  @IsString()
  articleId: string;

  @Column()
  @Type(() => Number) // ⚠️ 重要，否则 sort 会变成 undefined
  sort: number;

  @IsString()
  text: string;

  @IsString()
  translation: string;
}

import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Article } from '@/modules/article/entities/article.entity';
import { Chunk } from '@/modules/chunk/entities/chunk.entity';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Paragraph extends BaseEntity {
  @ManyToOne(() => Article, (article) => article.paragraphs)
  @JoinColumn({ name: 'articleId' })
  article!: Article;

  @Column()
  articleId!: string;

  @Column()
  @ApiProperty({ description: '排序' })
  @Type(() => Number)
  sort!: number;

  @Column('text')
  @IsString()
  @ApiProperty({ description: '正文' })
  text!: string;

  @Column('text')
  @IsString()
  @ApiProperty({ description: '翻译' })
  translation!: string;
}

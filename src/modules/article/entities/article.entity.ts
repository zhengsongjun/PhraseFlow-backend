import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Paragraph } from '@/modules/paragraph/entities/paragraph.entity';
import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['title'])
export class Article extends BaseEntity {
  @Column()
  @ApiProperty({ description: '文章标题' })
  title: string;

  @Column('text')
  @ApiProperty({ description: '文章内容' })
  content: string;

  @ApiProperty({ description: 'Related Paragraphs' })
  @OneToMany(() => Paragraph, (paragraph) => paragraph.article, {
    cascade: true,
    eager: false,
  })
  paragraphs: Paragraph[];
}

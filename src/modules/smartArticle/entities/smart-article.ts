import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Paragraph } from '@/modules/paragraph/entities/paragraph.entity';
import { Word } from '@/modules/word/entities/word.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('smart_article')
export class SmartArticle extends BaseEntity {
  @Column('text')
  @ApiProperty({ description: '标题' })
  title!: string;

  @Column()
  @ApiProperty({ description: '简介' })
  descript: string;
}

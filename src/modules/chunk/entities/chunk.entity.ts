import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Paragraph } from '@/modules/paragraph/entities/paragraph.entity';
import { Word } from '@/modules/word/entities/word.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Chunk extends BaseEntity {
  @ManyToOne(() => Paragraph, (paragraph) => paragraph.chunks)
  paragraph!: Paragraph;

  @Column()
  @ApiProperty({ description: '排序' })
  sort!: number;

  @Column('text')
  @ApiProperty({ description: '正文' })
  text!: string;

  @Column()
  @ApiProperty({ description: '音标' })
  phonetic!: string;

  @Column('text')
  @ApiProperty({ description: '翻译' })
  definition!: string;

  @OneToMany(() => Word, (word) => word.chunk, {
    cascade: true,
    eager: true,
  })
  words!: Word[];
}

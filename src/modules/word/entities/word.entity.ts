import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Chunk } from '@/modules/chunk/entities/chunk.entity';

@Entity()
export class Word extends BaseEntity {
  @ManyToOne(() => Chunk, (chunk) => chunk.words)
  chunk!: Chunk;

  @Column()
  sort!: number;

  @Column()
  text!: string;

  @Column()
  phonetic!: string;

  @Column('text')
  definition!: string;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Paragraph } from '../paragraph/entities/paragraph.entity';
import { Word } from '../word/entities/word.entity';
import { Chunk } from '../chunk/entities/chunk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Paragraph, Word, Chunk])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
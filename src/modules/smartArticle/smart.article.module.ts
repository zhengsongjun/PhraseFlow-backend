import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartArticle } from './entities/smart-article';
import { SmartArticleController } from './smart.article.controller';
import { SmartArticleService } from './smart.article.service';
import { Chunk } from '../chunk/entities/chunk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartArticle, Chunk])],
  controllers: [SmartArticleController],
  providers: [SmartArticleService],
  exports: [SmartArticleService],
})
export class SmartActicleModule {}

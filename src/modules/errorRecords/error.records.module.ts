import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorRecordsEntity } from './entities/error.records.dto';
import { ErrorRecordController } from './error.records.controller';
import { ErrorRecordService } from './error.records.service';
import { Module } from '@nestjs/common';
import { Article } from '../article/entities/article.entity';
import { SmartArticle } from '../smartArticle/entities/smart-article';
import { Chunk } from '../chunk/entities/chunk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ErrorRecordsEntity,
      Article,
      SmartArticle,
      Chunk,
    ]),
  ],
  controllers: [ErrorRecordController],
  providers: [ErrorRecordService],
  exports: [ErrorRecordService],
})
export class ErrorRecordsModule {}

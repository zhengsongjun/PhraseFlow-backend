import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

import { ArticleModule } from '@/modules/article/article.module';
import { ParagraphModule } from '@/modules/paragraph/paragraph.module';
import { ChunkModule } from '@/modules/chunk/chunk.module';
import { WordModule } from '@/modules/word/word.module';
import { UserModule } from './modules/user/use.module';
import { ActiveLogModule } from './modules/activityLog/activeLog.module';
import { ParcticesStatisticModule } from './modules/practiceStatistic/practice.statistics.module';
import { SmartActicleModule } from './modules/smartArticle/smart.article.module';
import { ErrorRecordsModule } from './modules/errorRecords/error.records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // ✅ 添加 imports: [ConfigModule]
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 👈 加这句！
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    ArticleModule,
    ParagraphModule,
    ChunkModule,
    WordModule,
    UserModule,
    ActiveLogModule,
    ParcticesStatisticModule,
    SmartActicleModule,
    ErrorRecordsModule,
  ],
})
export class AppModule {}

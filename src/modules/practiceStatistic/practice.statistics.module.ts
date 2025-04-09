import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeStatistic } from './entities/practice.statistics.entry';
import { PracticeStasticController } from './practice.statistics.controller';
import { PracticeStatisticsService } from './practice.statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeStatistic])],
  controllers: [PracticeStasticController],
  providers: [PracticeStatisticsService],
})
export class ParcticesStatisticModule {}

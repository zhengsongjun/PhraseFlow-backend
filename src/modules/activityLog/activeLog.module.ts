import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveLog } from './entities/activeLog';
import { ActiveLogController } from './activeLog.controller';
import { ActiveLogService } from './activeLog.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveLog]), ActiveLogModule],
  controllers: [ActiveLogController],
  providers: [ActiveLogService],
})
export class ActiveLogModule {}

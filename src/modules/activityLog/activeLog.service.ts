import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActiveLogDto } from './dto/create-activeLog.dto';
import { ActiveLog } from './entities/activeLog';

@Injectable()
export class ActiveLogService {
  constructor(
    @InjectRepository(ActiveLog)
    private readonly repo: Repository<ActiveLog>
  ) {}

  async saveLog(dto: CreateActiveLogDto & { userId: string }) {
    console.log('dto是这个样子', dto);
    console.log('[保存前] startTime =', dto.startTime, new Date(dto.startTime));
    const log = this.repo.create({
      userId: dto.userId,
      page: dto.page,
      startTime: new Date(dto.startTime),
      duration: dto.duration,
    });
    return this.repo.save(log);
  }
}

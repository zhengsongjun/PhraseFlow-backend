import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActiveLogDto } from './dto/create-activeLog.dto';
import { ActiveLog } from './entities/activeLog';
import { format } from 'date-fns';

@Injectable()
export class ActiveLogService {
  constructor(
    @InjectRepository(ActiveLog)
    private readonly repo: Repository<ActiveLog>
  ) {}

  async saveLog(dto: CreateActiveLogDto & { userId: string }) {
    const log = this.repo.create({
      userId: dto.userId,
      page: dto.page,
      startTime: new Date(dto.startTime),
      duration: dto.duration,
    });
    return this.repo.save(log);
  }

  async getCurrentDay(userId: string) {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const { sum } = await this.repo
      .createQueryBuilder('log')
      .select('SUM(log.duration)', 'sum')
      .where('log.userId = :userId', { userId })
      .andWhere('log.startTime BETWEEN :start AND :end', { start, end })
      .getRawOne();

    return Number(sum || 0); // 返回今天总时长（秒）
  }

  async getCurrentWeek(userId: string) {
    const now = new Date();

    // 计算本周一（开始）
    const day = now.getDay(); // 0 ~ 6 (周日 ~ 周六)
    const diff = day === 0 ? -6 : 1 - day;
    const start = new Date(now);
    start.setDate(now.getDate() + diff);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    // 兼容 MySQL 用 DATE_FORMAT 提取星期名
    const result = await this.repo
      .createQueryBuilder('log')
      .select('DAYNAME(log.startTime)', 'weekday')
      .addSelect('SUM(log.duration)', 'total')
      .where('log.userId = :userId', { userId })
      .andWhere('log.startTime BETWEEN :start AND :end', {
        start,
        end,
      })
      .groupBy('weekday')
      .getRawMany();

    // 初始化完整星期结构（防止空天丢失）
    const weekMap: Record<string, number> = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    result.forEach((row) => {
      const day = row.weekday.trim(); // DAYNAME 有些版本有空格
      weekMap[day] = Number(row.total);
    });

    return weekMap;
  }

  async getCurrentMonthByDayNumber(userId: string) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based

    const start = new Date(year, month, 1, 0, 0, 0);
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const result = await this.repo
      .createQueryBuilder('log')
      .select('DAY(log.startTime)', 'day')
      .addSelect('SUM(log.duration)', 'total')
      .where('log.userId = :userId', { userId })
      .andWhere('log.startTime BETWEEN :start AND :end', { start, end })
      .groupBy('day')
      .orderBy('day', 'ASC')
      .getRawMany();

    // 初始化 map（本月的每一天）
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 动态月份天数
    const map: Record<number, number> = {};
    for (let i = 1; i <= daysInMonth; i++) {
      map[i] = 0; // 默认置 0
    }

    // 填充实际数据
    result.forEach((row) => {
      const day = Number(row.day);
      map[day] = Number(row.total);
    });

    return map;
  }

  async getCurrentMonth(userId: string) {
    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const startStr = format(start, 'yyyy-MM-dd HH:mm:ss');
    const endStr = format(end, 'yyyy-MM-dd HH:mm:ss');

    const result = await this.repo.query(
      `
      SELECT SUM(duration) as total 
      FROM english.activity_logs 
      WHERE userId = ? 
        AND startTime BETWEEN ? AND ?
      `,
      [userId, startStr, endStr]
    );

    return Number(result[0].total || 0);
  }
}

import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActiveLogService } from './activeLog.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { CreateActiveLogDto } from './dto/create-activeLog.dto';

@ApiTags('活跃时间管理')
@Controller('active-log')
export class ActiveLogController {
  constructor(private readonly service: ActiveLogService) {}

  @Post()
  @ApiOperation({ summary: '活跃时间页面' })
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() req, @Body() dto: CreateActiveLogDto) {
    const userId = req.userId;
    return this.service.saveLog({ ...dto, userId });
  }

  @Get('day')
  @ApiOperation({ summary: '获取今日学习总时长（秒）' })
  @UseGuards(JwtAuthGuard)
  getToday(@CurrentUser() req) {
    return this.service.getCurrentDay(req.userId);
  }

  @Get('week')
  @ApiOperation({ summary: '获取本周每天学习时长（用于折线图）' })
  @UseGuards(JwtAuthGuard)
  getWeek(@CurrentUser() req) {
    return this.service.getCurrentWeek(req.userId);
  }

  @Get('month')
  @ApiOperation({ summary: '获取本月学习总时长' })
  @UseGuards(JwtAuthGuard)
  getMonth(@CurrentUser() req) {
    return this.service.getCurrentMonth(req.userId);
  }

  @Get('month-map')
  @ApiOperation({ summary: '获取本月每天学习时长（用于折线图）' })
  @UseGuards(JwtAuthGuard)
  getMonthMap(@CurrentUser() req) {
    return this.service.getCurrentMonthByDayNumber(req.userId);
  }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
    console.log(dto);
    const userId = req.userId;
    return this.service.saveLog({ ...dto, userId });
  }
}

import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PracticeStatisticsService } from './practice.statistics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UpdatePracticeStatistics } from './dto/update-practice-statistics.dto';

@ApiTags('文章练习统计')
@Controller('/statistic')
export class PracticeStasticController {
  constructor(private readonly service: PracticeStatisticsService) {}

  @Get()
  @ApiOperation({ summary: '获取文章统计' })
  @UseGuards(JwtAuthGuard)
  findByOneArticleStatistic(
    @CurrentUser() user,
    @Query('articleId') articleId: string
  ) {
    const useId = user.userId;
    return this.service.toUserIdAndarticleIdFindCont(useId, articleId);
  }

  @Put()
  @ApiOperation({ summary: '跟新文章练习次数' })
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @CurrentUser() userInfo,
    @Body() req: UpdatePracticeStatistics
  ) {
    const result = await this.service.update(userInfo.userId, req.articleId);
    return result;
  }
}

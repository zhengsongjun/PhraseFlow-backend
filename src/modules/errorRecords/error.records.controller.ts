import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ErrorRecordService } from './error.records.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateErrorRecordDto } from './dto/create-error-records.dto';
import { DeleteErrorRecordDto } from './dto/delete-error-records.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('错误本')
@Controller('error-records')
export class ErrorRecordController {
  constructor(private readonly service: ErrorRecordService) {}

  @Post()
  @ApiOperation({ summary: '创建错题' })
  @UseGuards(JwtAuthGuard)
  async createErrorRecord(
    @CurrentUser() userInfo,
    @Body() dto: CreateErrorRecordDto
  ) {
    return this.service.createErrorRecord(dto, userInfo.userId);
  }

  @Get()
  @ApiOperation({ summary: '获取用户所有错题' })
  @UseGuards(JwtAuthGuard)
  async getErrorRecords(@CurrentUser() userInfo) {
    return await this.service.getErrorRecords(userInfo.userId);
  }

  @Delete()
  @ApiOperation({ summary: '删除错题' })
  @UseGuards(JwtAuthGuard)
  async deleteErrorRecords(dto: DeleteErrorRecordDto, @CurrentUser() useInfo) {
    return await this.service.deleteErrorRecords(
      {
        ...dto,
      },
      useInfo.userId
    );
  }
}

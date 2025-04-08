import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateActiveLogDto {
  @ApiProperty({ description: '页面名称' })
  @IsString()
  page: string;

  @ApiProperty({ description: '开始时间' })
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @ApiProperty({ description: '持续时间' })
  @IsNumber()
  duration: number;
}

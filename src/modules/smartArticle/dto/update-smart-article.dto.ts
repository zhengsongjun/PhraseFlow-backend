import { BaseEntity } from '@/common/entities/base.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSmartActicleDto {
  @ApiPropertyOptional({ description: '排序顺序' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsString()
  descript?: string;
}

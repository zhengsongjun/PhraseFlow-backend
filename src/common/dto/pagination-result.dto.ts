import { Article } from '@/modules/article/entities/article.entity';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(Article) // 告诉 Swagger 需要额外解析 PaginationResult 泛型类型
export class PaginationResult<T> {
  @ApiProperty({ description: '数据列表', type: [Article] }) // 明确指定数据类型
  data: T[];

  @ApiProperty({ description: '总数', type: Number })
  total: number;
}

import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('error_records')
export class ErrorRecordsEntity extends BaseEntity {
  @ApiProperty({ description: 'chunkId' })
  @Column()
  chunkId: string;

  @Column()
  @ApiProperty({ description: '用户id' })
  userId: string;

  @Column()
  @ApiProperty({ description: '来源id' })
  source: string;

  @Column()
  @ApiProperty({ description: '来源类型' })
  sourceType: string;
}

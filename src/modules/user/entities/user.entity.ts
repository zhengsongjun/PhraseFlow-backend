import { BaseEntity } from '@/common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  @ApiProperty({ description: '别名' })
  nickname: string;

  @Column()
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '手机' })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '邮箱' })
  email: string;

  @Column()
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '描述' })
  description: string;
}

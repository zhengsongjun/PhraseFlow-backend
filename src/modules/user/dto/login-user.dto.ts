import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '秘钥' })
  token: string;

  @ApiProperty({ description: '用户信息' })
  user: {
    id: string;
    username: string;
  };
}

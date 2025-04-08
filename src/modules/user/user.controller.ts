import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  createUser(@Body() dto: CreateUserDto) {
    console.log(dto);
    return this.user.register(dto);
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Body() dto: CreateUserDto) {
    return this.user.login(dto);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { md5 } from '@/utils/crypto';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  register(dto: CreateUserDto): Promise<User> {
    try {
      const encryptedPassword = md5(dto.password);
      const user = this.userRepo.create({
        username: dto.username,
        password: encryptedPassword,
      });
      return this.userRepo.save(user);
    } catch (e) {
      throw error(e);
    }
  }

  async login(dto: CreateUserDto): Promise<LoginUserDto> {
    const encryptedPassword = md5(dto.password);
    const user = await this.userRepo.findOneBy({
      username: dto.username,
      password: encryptedPassword,
    });

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload = { sub: user.id, username: user.username }; // ✅ 使用 sub
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}

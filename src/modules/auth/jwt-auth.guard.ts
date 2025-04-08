import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      // ✅ 这里抛出 UnauthorizedException 很关键
      throw err || new UnauthorizedException('JWT 无效或未提供');
    }
    return user;
  }
}

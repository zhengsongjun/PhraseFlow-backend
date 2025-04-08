import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    // 检查是否是 Swagger 文档相关的请求
    if (request.url.startsWith('/api-docs')) {
      return next.handle(); // 直接返回原始数据，不包装
    }

    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          message: '成功',
          data,
        };
      })
    );
  }
}

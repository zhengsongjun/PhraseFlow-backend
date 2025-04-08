import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// ✅ 引入统一响应 & 错误处理
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/interceptors/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 启用全局参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 剔除多余字段
      // forbidNonWhitelisted: false, // 多余字段报错
      transform: true, // 自动转换类型
    })
  );

  // ✅ 启用全局拦截器 & 异常过滤器
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ 端口获取
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  // ✅ Swagger 配置
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Learn English API')
    .setDescription('本项目用于文章、段落、词块练习管理')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  // ✅ 启动应用
  await app.listen(port);
  console.log(`🚀 App running at: ${await app.getUrl()}`);
  console.log(`📚 Swagger docs: ${await app.getUrl()}/api-docs`);
}
bootstrap();

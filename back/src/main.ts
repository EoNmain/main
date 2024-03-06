import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from './common/interceptor';
import { MiddleExceptionFilter } from './common/filter/middle.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MiddleExceptionFilter());
  app.useGlobalInterceptors(new Interceptor());
  app.enableCors({
    origin: true, //어떤 오리진과 연동?
    credentials: true, //쿠키 및 인증 헤더
    exposedHeaders: ['Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }); 
  const config = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('The is a sample REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();

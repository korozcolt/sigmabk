import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.APPLICATION_PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('SIGMA BACKEND API')
    .setDescription(
      'API para el sistema de seguimiento y administración de Usuarios',
    )
    .setVersion('3.1.0')
    .addBearerAuth()
    .addTag('sigma')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();

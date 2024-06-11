import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/app-configuration.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(AppConfiguration);

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API description for User operations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(configService.appPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${configService.appPort}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger is available on: http://localhost:${configService.appPort}/spec`,
  );
}

bootstrap();

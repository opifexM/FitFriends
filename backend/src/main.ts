import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/app-configuration.service';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const configService = app.get(AppConfiguration);

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API description for User operations')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(configService.appPort, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${configService.appPort}/${GLOBAL_PREFIX}`,
  );
  Logger.log(
    `📚 Swagger is available on: http://localhost:${configService.appPort}/spec`,
  );
}

bootstrap();

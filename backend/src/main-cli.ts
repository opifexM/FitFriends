#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli/cli.module';
import { CliService } from './cli/cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule);
  const cliService = app.get(CliService);
  cliService.run();
}

bootstrap();

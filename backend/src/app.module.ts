import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfiguration } from './config/app-configuration.service';
import { validate } from './config/server.env';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'server.env',
      validate,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppConfiguration],
  exports: [],
})
export class AppModule {}

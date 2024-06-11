import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRootAsync(getMongooseOptions())],
})
export class DatabaseModule {}

function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('MONGO_USER'),
          password: config.get<string>('MONGO_PASSWORD'),
          host: config.get<string>('MONGO_HOST'),
          port: config.get<number>('MONGO_PORT'),
          authDatabase: config.get<string>('MONGO_AUTH_BASE'),
          databaseName: config.get<string>('MONGO_DB'),
        }),
      };
    },
    inject: [ConfigService],
  };
}

function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

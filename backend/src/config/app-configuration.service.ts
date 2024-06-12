import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfiguration {
  constructor(private configService: NestConfigService) {}

  public get appPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  public get appPasswordSaltRounds(): number {
    return this.configService.get<number>('APP_PASSWORD_SALT_ROUNDS');
  }

  public get mongoDb(): string {
    return this.configService.get<string>('MONGO_DB');
  }

  public get mongoHost(): string {
    return this.configService.get<string>('MONGO_HOST');
  }

  public get mongoPort(): number {
    return this.configService.get<number>('MONGO_PORT');
  }

  public get mongoUser(): string {
    return this.configService.get<string>('MONGO_USER');
  }

  public get mongoPassword(): string {
    return this.configService.get<string>('MONGO_PASSWORD');
  }

  public get mongoAuthBase(): string {
    return this.configService.get<string>('MONGO_AUTH_BASE');
  }

  public get accessTokenSecret(): string {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }

  public get accessTokenExpiresIn(): string {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN');
  }

  public get refreshTokenSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  public get refreshTokenExpiresIn(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN');
  }

  public get jwtAlgorithm(): string {
    return this.configService.get<string>('JWT_ALGORITHM');
  }
}

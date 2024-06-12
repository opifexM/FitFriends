import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Min, validateSync } from 'class-validator';

export class ServerEnvConfig {
  @IsNumber()
  @Min(1)
  APP_PORT: number;

  @IsNumber()
  APP_PASSWORD_SALT_ROUNDS: number;

  @IsString()
  MONGO_DB: string;

  @IsString()
  MONGO_HOST: string;

  @IsNumber()
  @Min(1)
  MONGO_PORT: number;

  @IsString()
  MONGO_USER: string;

  @IsString()
  MONGO_PASSWORD: string;

  @IsString()
  MONGO_AUTH_BASE: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_ALGORITHM: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ServerEnvConfig, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

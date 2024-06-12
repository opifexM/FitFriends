import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptCrypto } from './bcrypt.crypto';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: BcryptCrypto,
      useFactory: (config: ConfigService) => {
        const saltRounds = config.get<number>('APP_PASSWORD_SALT_ROUNDS');
        return new BcryptCrypto(saltRounds);
      },
      inject: [ConfigService],
    },
  ],
  exports: [BcryptCrypto],
})
export class CryptoModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Algorithm } from 'jsonwebtoken';
import { TokenRepository } from './entity/token.repository';
import { TokenModel, TokenSchema } from './entity/token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TokenModel.name, schema: TokenSchema }]),
    ConfigModule,
    JwtModule.registerAsync(getJwtAsyncOptions()),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}

function getJwtAsyncOptions(): JwtModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
          algorithm: configService.get<string>('JWT_ALGORITHM') as Algorithm,
        },
      };
    },
    inject: [ConfigService],
  };
}

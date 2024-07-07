import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoModule } from '../crypto/crypto.module';
import { FileModule } from '../file-module/file.module';
import { TokenModule } from '../token-module/token.module';
import { JwtAccessStrategy } from './authentication/strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './authentication/strategy/jwt-refresh.strategy';
import { LocalStrategy } from './authentication/strategy/local.strategy';
import { UserRepository } from './entity/user.repository';
import { UserModel, UserSchema } from './entity/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    CryptoModule,
    ConfigModule,
    TokenModule,
    FileModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}

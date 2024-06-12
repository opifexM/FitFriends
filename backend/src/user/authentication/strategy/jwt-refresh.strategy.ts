import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from 'shared/type/refresh-token-payload.interface';
import { TokenService } from '../../../token-module/token.service';
import { UserEntity } from '../../entity/user.entity';
import { UserService } from '../../user.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly logger = new Logger(JwtRefreshStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  public async validate(payload: RefreshTokenPayload): Promise<UserEntity> {
    this.logger.log(
      `Validating JWT refresh token for user with email: ${payload.email}`,
    );
    if (!(await this.tokenService.isExists(payload.tokenId))) {
      this.logger.warn(`Token ID '${payload.tokenId}' does not exist.`);
      throw new TokenNotExistsException(payload.tokenId);
    }

    this.logger.log(
      `Deleting refresh session for token ID: ${payload.tokenId}`,
    );
    await this.tokenService.deleteRefreshSession(payload.tokenId);

    this.logger.log(`Deleting expired refresh tokens`);
    await this.tokenService.deleteExpiredRefreshTokens();

    return this.userService.getUserByEmail(payload.email);
  }
}

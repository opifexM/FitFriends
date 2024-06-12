import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { addTime, parseTime } from 'shared/lib/common';
import { RefreshTokenPayload } from 'shared/type/refresh-token-payload.interface';
import { Token } from 'shared/type/token.interface';
import { createJWTPayload } from '../user/authentication/jwt';
import { UserEntity } from '../user/entity/user.entity';
import { TokenEntity } from './entity/token.entity';
import { TokenRepository } from './entity/token.repository';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async createRefreshSession(
    payload: RefreshTokenPayload,
  ): Promise<TokenEntity> {
    this.logger.log(`Creating refresh session for user ID: '${payload.sub}'`);
    const timeValue = parseTime(
      this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    );
    const refreshToken = new TokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: addTime(timeValue.value, timeValue.unit),
    });

    const savedToken = await this.tokenRepository.save(refreshToken);
    this.logger.log(
      `Refresh session created with token ID: '${savedToken.tokenId}'`,
    );

    return savedToken;
  }

  public async deleteRefreshSession(tokenId: string): Promise<TokenEntity> {
    this.logger.log(
      `Attempting to delete refresh session with token ID: '${tokenId}'`,
    );

    const deletedToken = await this.tokenRepository.deleteByTokenId(tokenId);
    this.logger.log(`Refresh session deleted with token ID: '${tokenId}'`);

    return deletedToken;
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const foundToken = await this.tokenRepository.findByTokenId(tokenId);

    return !!foundToken;
  }

  public async deleteExpiredRefreshTokens(): Promise<boolean> {
    this.logger.log('Attempting to delete expired refresh tokens');

    const isExpiredTokensDeleted =
      await this.tokenRepository.deleteExpiredTokens();
    if (!isExpiredTokensDeleted) {
      this.logger.error('Failed to delete expired refresh tokens');
    }

    return isExpiredTokensDeleted;
  }

  public async createUserToken(user: UserEntity): Promise<Token> {
    this.logger.log(`Generating token for user ID: '${user.id}'`);
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      );
      this.logger.log(
        `Tokens generated successfully for user ID: '${user.id}'`,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Tokens generation error]: ' + error.message);
      throw new HttpException(
        'Tokens generation error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

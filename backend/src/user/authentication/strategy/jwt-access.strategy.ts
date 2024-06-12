import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'shared/type/token-payload.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtAccessStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: TokenPayload): Promise<TokenPayload> {
    this.logger.log(
      `Validating access token for user with ID: '${payload.sub}'`,
    );
    return payload;
  }
}

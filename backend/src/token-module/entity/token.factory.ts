import { Logger } from '@nestjs/common';
import { TokenEntity } from './token.entity';

export class TokenFactory {
  private static readonly logger = new Logger(TokenFactory.name);

  public static createEntity(plainObject: any): TokenEntity {
    return new TokenEntity(plainObject);
  }
}

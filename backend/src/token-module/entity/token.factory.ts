import { Logger } from '@nestjs/common';
import { TokenEntity } from './token.entity';

export class TokenFactory {
  private static readonly logger = new Logger(TokenFactory.name);

  public static createEntity(plainObject: any): TokenEntity {
    this.logger.log(`Create token entity: '${JSON.stringify(plainObject)}'`);
    return new TokenEntity(plainObject);
  }
}

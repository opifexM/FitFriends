import { Logger } from '@nestjs/common';
import { BalanceEntity } from './balance.entity';

export class BalanceFactory {
  private static readonly logger = new Logger(BalanceFactory.name);

  public static createEntity(plainObject: any): BalanceEntity {
    this.logger.log(`Create balance entity: '${JSON.stringify(plainObject)}'`);
    return new BalanceEntity(plainObject);
  }
}

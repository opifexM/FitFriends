import { Logger } from '@nestjs/common';
import { OrderEntity } from './order.entity';

export class OrderFactory {
  private static readonly logger = new Logger(OrderFactory.name);

  public static createEntity(plainObject: any): OrderEntity {
    this.logger.log(`Create order entity: '${JSON.stringify(plainObject)}'`);
    return new OrderEntity(plainObject);
  }
}

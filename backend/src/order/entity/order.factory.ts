import { Logger } from '@nestjs/common';
import { OrderEntity } from './order.entity';

export class OrderFactory {
  private static readonly logger = new Logger(OrderFactory.name);

  public static createEntity(plainObject: any): OrderEntity {
    return new OrderEntity(plainObject);
  }
}

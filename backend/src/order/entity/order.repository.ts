import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { OrderEntity } from './order.entity';
import { OrderFactory } from './order.factory';
import { OrderModel } from './order.schema';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(
    @InjectModel(OrderModel.name)
    private orderModel: Model<OrderModel>,
  ) {
    super(orderModel as any, OrderRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): OrderEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return OrderFactory.createEntity(plainObject);
  }
}

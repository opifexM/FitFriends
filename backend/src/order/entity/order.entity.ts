import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { PaymentType } from 'shared/type/enum/payment-type.enum';
import { PurchaseType } from 'shared/type/enum/purchase-type.enum';
import { Order } from 'shared/type/order/order';

export class OrderEntity extends Entity implements Order {
  public count: number;
  public createdAt: Date;
  public payment: PaymentType;
  public price: number;
  public purchase: PurchaseType;
  public service: Types.ObjectId;
  public totalPrice: number;
  public updatedAt: Date;
  public user: Types.ObjectId;

  constructor(order?: Order) {
    super();
    this.fillUserData(order);
  }

  public fillUserData(order?: Order): void {
    if (!order) {
      return;
    }

    this.id = order.id ?? '';
    this.count = order.count;
    this.createdAt = order.createdAt;
    this.payment = order.payment;
    this.price = order.price;
    this.purchase = order.purchase;
    this.service = order.service;
    this.totalPrice = order.totalPrice;
    this.updatedAt = order.updatedAt;
    this.user = order.user;
  }

  public toPOJO() {
    return {
      id: this.id,
      count: this.count,
      createdAt: this.createdAt,
      payment: this.payment,
      price: this.price,
      purchase: this.purchase,
      service: this.service,
      totalPrice: this.totalPrice,
      updatedAt: this.updatedAt,
      user: this.user,
    };
  }
}

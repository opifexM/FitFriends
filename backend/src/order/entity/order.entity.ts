import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { PaymentStatusType } from 'shared/type/enum/payment-status-type.enum';
import { PaymentType } from 'shared/type/enum/payment-type.enum';
import { PurchaseType } from 'shared/type/enum/purchase-type.enum';
import { Order } from 'shared/type/order/order';

export class OrderEntity extends Entity implements Order {
  public user: Types.ObjectId;
  public count: number;
  public price: number;
  public totalPrice: number;
  public payment: PaymentType;
  public purchase: PurchaseType;
  public service: Types.ObjectId;
  public paymentStatus: PaymentStatusType;
  public updatedAt: Date;
  public createdAt: Date;

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
    this.paymentStatus = order.paymentStatus;
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
      paymentStatus: this.paymentStatus,
      service: this.service,
      totalPrice: this.totalPrice,
      updatedAt: this.updatedAt,
      user: this.user,
    };
  }
}

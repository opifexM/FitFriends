import { instanceToPlain } from 'class-transformer';
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

    Object.assign(this, order);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

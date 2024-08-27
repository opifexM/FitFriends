import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { Balance } from 'shared/type/balance/balance';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum';

export class BalanceEntity extends Entity implements Balance {
  public totalCount: number;
  public availableCount: number;
  public training: Types.ObjectId;
  public user: Types.ObjectId;
  public purchaseStatus: PurchaseStatusType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(balance?: Balance) {
    super();
    this.fillUserData(balance);
  }

  public fillUserData(balance?: Balance): void {
    if (!balance) {
      return;
    }

    Object.assign(this, balance);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

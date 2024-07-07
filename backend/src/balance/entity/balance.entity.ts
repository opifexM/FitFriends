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

    this.id = balance.id ?? '';
    this.totalCount = balance.totalCount;
    this.availableCount = balance.availableCount;
    this.createdAt = balance.createdAt;
    this.updatedAt = balance.updatedAt;
    this.training = balance.training;
    this.user = balance.user;
    this.purchaseStatus = balance.purchaseStatus;
  }

  public toPOJO() {
    return {
      id: this.id,
      totalCount: this.totalCount,
      availableCount: this.availableCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user,
      training: this.training,
      purchaseStatus: this.purchaseStatus,
    };
  }
}

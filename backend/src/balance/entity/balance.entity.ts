import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { Balance } from 'shared/type/balance/balance';

export class BalanceEntity extends Entity implements Balance {
  public count: number;
  public createdAt: Date;
  public training: Types.ObjectId;
  public updatedAt: Date;
  public user: Types.ObjectId;

  constructor(balance?: Balance) {
    super();
    this.fillUserData(balance);
  }

  public fillUserData(balance?: Balance): void {
    if (!balance) {
      return;
    }

    this.id = balance.id ?? '';
    this.count = balance.count;
    this.createdAt = balance.createdAt;
    this.updatedAt = balance.updatedAt;
    this.training = balance.training;
    this.user = balance.user;
  }

  public toPOJO() {
    return {
      id: this.id,
      count: this.count,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user,
      training: this.training,
    };
  }
}

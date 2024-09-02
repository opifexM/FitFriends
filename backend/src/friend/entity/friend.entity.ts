import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { RequestStatusType } from 'shared/type/enum/request-status-type.enum';
import { Friend } from 'shared/type/friend/friend';

export class FriendEntity extends Entity implements Friend {
  public friend: Types.ObjectId;
  public friendInitiator: Types.ObjectId;
  public requestInitiator: string;
  public requestStatus: RequestStatusType;
  public updatedAt: Date;
  public createdAt: Date;

  constructor(friend?: Friend) {
    super();
    this.fillUserData(friend);
  }

  public fillUserData(friend?: Friend): void {
    if (!friend) {
      return;
    }

    Object.assign(this, friend);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

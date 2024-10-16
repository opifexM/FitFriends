import { instanceToPlain } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Entity } from 'shared/base/entity';
import { Notify } from 'shared/type/notify/notify';

export class NotifyEntity extends Entity implements Notify {
  public createdAt: Date;
  public text: string;
  public topic: string;
  public updatedAt: Date;
  public user: ObjectId;
  public isRead: boolean;

  constructor(notify?: Notify) {
    super();
    this.fillUserData(notify);
  }

  public fillUserData(notify?: Notify): void {
    if (!notify) {
      return;
    }

    Object.assign(this, notify);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

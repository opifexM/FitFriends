import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { Review } from 'shared/type/review/review';

export class ReviewEntity extends Entity implements Review {
  public createdAt: Date;
  public rating: number;
  public text: string;
  public training: Types.ObjectId;
  public updatedAt: Date;
  public user: Types.ObjectId;

  constructor(review?: Review) {
    super();
    this.fillUserData(review);
  }

  public fillUserData(review?: Review): void {
    if (!review) {
      return;
    }

    Object.assign(this, review);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

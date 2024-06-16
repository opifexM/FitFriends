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

    this.id = review.id ?? '';
    this.createdAt = review.createdAt;
    this.rating = review.rating;
    this.text = review.text;
    this.training = review.training;
    this.updatedAt = review.updatedAt;
    this.user = review.user;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      rating: this.rating,
      text: this.text,
      training: this.training,
      updatedAt: this.updatedAt,
      user: this.user,
    };
  }
}

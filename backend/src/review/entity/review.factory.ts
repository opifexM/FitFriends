import { Logger } from '@nestjs/common';
import { ReviewEntity } from './review.entity';

export class ReviewFactory {
  private static readonly logger = new Logger(ReviewFactory.name);

  public static createEntity(plainObject: any): ReviewEntity {
    this.logger.log(`Create review entity: '${JSON.stringify(plainObject)}'`);
    return new ReviewEntity(plainObject);
  }
}

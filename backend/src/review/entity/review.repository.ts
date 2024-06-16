import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { ReviewEntity } from './review.entity';
import { ReviewFactory } from './review.factory';
import { ReviewModel } from './review.schema';

@Injectable()
export class ReviewRepository extends BaseRepository<ReviewEntity> {
  constructor(
    @InjectModel(ReviewModel.name)
    private reviewModel: Model<ReviewModel>,
  ) {
    super(reviewModel as any, ReviewRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): ReviewEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return ReviewFactory.createEntity(plainObject);
  }
}

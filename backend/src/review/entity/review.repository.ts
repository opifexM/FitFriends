import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { PaginationResult } from 'shared/type/pagination.interface';
import { ReviewSortType } from 'shared/type/review/review-sort-type.enum';
import { ReviewQuery } from 'shared/type/review/review.query';
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

  public async findAllByTrainingIdByQuery(
    trainingId: string,
    { limit, currentPage, sortType, sortDirection }: ReviewQuery,
  ): Promise<PaginationResult<ReviewEntity>> {
    const sortCriteria: { [key: string]: 'asc' | 'desc' } = {};
    if (sortType === ReviewSortType.BY_DATE) {
      sortCriteria['createdAt'] = sortDirection;
    }

    const skip = (currentPage - 1) * limit;
    this.logger.log(
      `Retrieving trainings sortCriteria: '${JSON.stringify(sortCriteria)}', skip: '${skip}', limit: '${limit}'`,
    );

    const reviews = await this.model
      .find({ training: trainingId })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        select: 'name avatarId profilePictureId',
      });

    const reviewCount = await this.model.countDocuments();

    this.logger.log(
      `Retrieved [${reviews.length}] reviews for training ID '${trainingId}'`,
    );

    return {
      entities: reviews.map((product) =>
        this.createEntityFromDocument(product),
      ),
      totalPages: Math.ceil(reviewCount / limit),
      currentPage: currentPage,
      totalItems: reviewCount,
      itemsPerPage: limit,
    };
  }

  public async findByUserId(userId: string): Promise<ReviewEntity | null> {
    this.logger.log(`Finding review by user ID: '${userId}'`);
    const foundDocument = await this.model
      .findOne({
        user: userId,
      })
      .sort({ createdAt: -1 });

    return this.createEntityFromDocument(foundDocument);
  }
}

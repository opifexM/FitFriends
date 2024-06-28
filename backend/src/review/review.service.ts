import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PaginationResult } from 'shared/type/pagination.interface';
import { CreateReviewDto } from 'shared/type/review/dto/create-review.dto';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto';
import { REVIEW_LIST } from 'shared/type/review/review.constant';
import { ReviewQuery } from 'shared/type/review/review.query';
import { TrainingService } from '../training/training.service';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { ReviewEntity } from './entity/review.entity';
import { ReviewFactory } from './entity/review.factory';
import { ReviewRepository } from './entity/review.repository';
import { REVIEW_MESSAGES } from './review.constant';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService,
  ) {}

  public async createReview(
    userId: string,
    dto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    const { training, rating, text } = dto;
    this.logger.log('Attempting to create review');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundReview = await this.trainingService.findTrainingById(training);
    if (!foundReview) {
      this.logger.warn(`Training with id '${training}' not found`);
      throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND);
    }

    const reviewData = {
      user: userId,
      training: foundReview.id,
      rating: rating,
      text: text,
    };

    const reviewEntity = ReviewFactory.createEntity(reviewData);
    const createdReview = await this.reviewRepository.save(reviewEntity);
    this.logger.log(`Review created with ID: '${createdReview.id}'`);

    return createdReview;
  }

  public async findLatestReviewByUserId(userId: string): Promise<ReviewEntity> {
    this.logger.log(`Looking for last review with user ID: '${userId}'`);
    const foundReview = await this.reviewRepository.findByUserId(userId);
    if (!foundReview) {
      this.logger.warn(`Last review not found with user ID: '${userId}'`);
      throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND);
    }

    return foundReview;
  }

  public async findReviewById(reviewId: string): Promise<ReviewEntity> {
    this.logger.log(`Looking for review with ID: '${reviewId}'`);
    const foundReview = await this.reviewRepository.findById(reviewId);
    if (!foundReview) {
      this.logger.warn(`Review not found with ID: '${reviewId}'`);
      throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND);
    }

    return foundReview;
  }

  public async updateReviewById(
    userId: string,
    reviewId: string,
    dto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    this.logger.log(`Updating review with ID: '${reviewId}'`);
    const updatedReview = await this.findReviewById(reviewId);
    if (!updatedReview) {
      this.logger.warn(`Review not found with ID: '${reviewId}'`);
      throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND);
    }
    if (userId !== updatedReview.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to review ID '${reviewId}'`,
      );
      throw new ForbiddenException(REVIEW_MESSAGES.NO_ACCESS);
    }

    if (dto.rating !== undefined) updatedReview.rating = dto.rating;
    if (dto.text !== undefined) updatedReview.text = dto.text;

    return this.reviewRepository.update(reviewId, updatedReview);
  }

  public async deleteReviewById(
    userId: string,
    reviewId: string,
  ): Promise<ReviewEntity> {
    this.logger.log(`Deleting review with ID: '${reviewId}'`);
    const foundReview = await this.reviewRepository.findById(reviewId);
    if (!foundReview) {
      this.logger.warn(`Review not found with ID: '${reviewId}'`);
      throw new NotFoundException(REVIEW_MESSAGES.NOT_FOUND);
    }
    if (userId !== foundReview.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to review ID '${reviewId}'`,
      );
      throw new ForbiddenException(REVIEW_MESSAGES.NO_ACCESS);
    }

    const deletedReview = await this.reviewRepository.deleteById(reviewId);
    this.logger.log(`Review with ID: '${reviewId}' deleted`);

    return deletedReview;
  }

  public async exists(reviewId: string): Promise<boolean> {
    return this.reviewRepository.exists(reviewId);
  }

  public async findReviewByTrainingIdByQuery(
    trainingId: string,
    reviewQuery?: ReviewQuery,
  ): Promise<PaginationResult<ReviewEntity>> {
    this.logger.log(`Finding all reviews for training ID '${trainingId}'`);

    const limit = Math.min(
      reviewQuery?.limit ?? Number.MAX_VALUE,
      REVIEW_LIST.LIMIT,
    );
    const currentPage =
      reviewQuery?.currentPage ?? REVIEW_LIST.DEFAULT_FILTER_PAGE;
    const sortDirection =
      reviewQuery?.sortDirection ?? REVIEW_LIST.DEFAULT_SORT_DIRECTION;
    const sortType = reviewQuery?.sortType ?? REVIEW_LIST.DEFAULT_SORT_TYPE;

    return this.reviewRepository.findAllByTrainingIdByQuery(trainingId, {
      limit,
      currentPage,
      sortType,
      sortDirection,
    });
  }
}

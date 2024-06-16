import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from 'shared/type/review/dto/create-review.dto';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto';
import { TRAINING_MESSAGES } from '../training/training.constant';
import { TrainingService } from '../training/training.service';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { ReviewEntity } from './entity/review.entity';
import { ReviewFactory } from './entity/review.factory';
import { ReviewRepository } from './entity/review.repository';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService,
  ) {}

  public async createReview(dto: CreateReviewDto): Promise<ReviewEntity> {
    const { user, training, rating, text } = dto;
    this.logger.log('Attempting to create review');

    const foundUser = await this.userService.findUserById(user);
    if (!foundUser) {
      this.logger.warn(`User with id '${user}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundTraining = await this.trainingService.findTrainingById(training);
    if (!foundTraining) {
      this.logger.warn(`Training with id '${training}' not found`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    const reviewData = {
      user: foundTraining.id,
      training: foundTraining.id,
      rating: rating,
      text: text,
    };

    const reviewEntity = ReviewFactory.createEntity(reviewData);
    const createdReview = await this.reviewRepository.save(reviewEntity);
    this.logger.log(`Review created with ID: '${createdReview.id}'`);

    return createdReview;
  }

  public async findReviewById(reviewId: string): Promise<ReviewEntity> {
    this.logger.log(`Looking for review with ID: '${reviewId}'`);
    const foundReview = await this.reviewRepository.findById(reviewId);
    if (!foundReview) {
      this.logger.warn(`Review not found with ID: '${reviewId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    return foundReview;
  }

  public async updateReviewById(
    reviewId: string,
    dto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    this.logger.log(`Updating review with ID: '${reviewId}'`);
    const updatedReview = await this.findReviewById(reviewId);

    if (dto.rating !== undefined) updatedReview.rating = dto.rating;
    if (dto.text !== undefined) updatedReview.text = dto.text;

    return this.reviewRepository.update(reviewId, updatedReview);
  }

  public async deleteReviewById(reviewId: string): Promise<ReviewEntity> {
    this.logger.log(`Deleting review with ID: '${reviewId}'`);
    const foundReview = await this.reviewRepository.findById(reviewId);
    if (!foundReview) {
      this.logger.warn(`Review not found with ID: '${reviewId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    const deletedReview = await this.reviewRepository.deleteById(reviewId);
    this.logger.log(`Review with ID: '${reviewId}' deleted`);

    return deletedReview;
  }

  public async exists(reviewId: string): Promise<boolean> {
    return this.reviewRepository.exists(reviewId);
  }
}

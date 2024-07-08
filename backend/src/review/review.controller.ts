import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateReviewDto } from 'shared/type/review/dto/create-review.dto';
import { ReviewPaginationDto } from 'shared/type/review/dto/review-pagination.dto';
import { ReviewDto } from 'shared/type/review/dto/review.dto';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto';
import { ReviewQuery } from 'shared/type/review/review.query';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { ReviewService } from './review.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);

  constructor(private readonly reviewService: ReviewService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: ReviewDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createReview(
    @Body() dto: CreateReviewDto,
    @GetUserId() userId: string,
  ): Promise<ReviewDto> {
    this.logger.log(`Creating new review with User ID: '${userId}'`);
    const createdReview = await this.reviewService.createReview(userId, dto);

    return fillDto(ReviewDto, createdReview.toPOJO());
  }

  @Get('latest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get last review by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The last review has been successfully retrieved.',
    type: ReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Last review not found.' })
  public async getLastQuestionnaire(
    @GetUserId() userId: string,
  ): Promise<ReviewDto> {
    this.logger.log(`Retrieving last review with User ID: '${userId}'`);
    const foundReview =
      await this.reviewService.findLatestReviewByUserId(userId);

    return fillDto(ReviewDto, foundReview.toPOJO());
  }

  @Get(':reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully retrieved.',
    type: ReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  public async getReview(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string,
  ): Promise<ReviewDto> {
    this.logger.log(`Retrieving review with ID: '${reviewId}'`);
    const foundReview = await this.reviewService.findReviewById(reviewId);

    return fillDto(ReviewDto, foundReview.toPOJO());
  }

  @Get('training/:trainingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get review list' })
  @ApiResponse({
    status: 200,
    description: 'The review list has been successfully retrieved.',
    type: ReviewPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Reviews not found.' })
  public async getAllReviewByTrainingId(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Query() query: ReviewQuery,
  ): Promise<ReviewPaginationDto> {
    this.logger.log(
      `Retrieving review list for training ID '${trainingId}' with query: ${JSON.stringify(query)}'`,
    );
    const reviewPaginationData =
      await this.reviewService.findReviewByTrainingIdByQuery(trainingId, query);

    return fillDto(ReviewPaginationDto, {
      ...reviewPaginationData,
      entities: reviewPaginationData.entities.map((product) =>
        product.toPOJO(),
      ),
    });
  }

  @Patch(':reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
    type: ReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  public async updateReview(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string,
    @Body() dto: UpdateReviewDto,
    @GetUserId() userId: string,
  ): Promise<ReviewDto> {
    this.logger.log(`Updating review with ID '${reviewId}'`);
    const updatedReview = await this.reviewService.updateReviewById(
      userId,
      reviewId,
      dto,
    );

    return fillDto(ReviewDto, updatedReview.toPOJO());
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully deleted.',
    type: ReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  public async deleteReview(
    @Param('reviewId', MongoIdValidationPipe) reviewId: string,
    @GetUserId() userId: string,
  ): Promise<ReviewDto> {
    this.logger.log(`Attempting to delete review with ID: ${reviewId}`);
    const deletedReview = await this.reviewService.deleteReviewById(
      userId,
      reviewId,
    );
    this.logger.log(`Review deleted with ID: '${deletedReview.id}'`);

    return fillDto(ReviewDto, deletedReview.toPOJO());
  }
}

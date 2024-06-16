import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
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
import { ReviewDto } from 'shared/type/review/dto/review.dto';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
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
  public async createReview(@Body() dto: CreateReviewDto): Promise<ReviewDto> {
    this.logger.log('Creating new review');
    const createdReview = await this.reviewService.createReview(dto);

    return fillDto(ReviewDto, createdReview.toPOJO());
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
  ): Promise<ReviewDto> {
    this.logger.log(`Updating review with ID '${reviewId}'`);
    const updatedReview = await this.reviewService.updateReviewById(
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
  ): Promise<ReviewDto> {
    this.logger.log(`Attempting to delete review with ID: ${reviewId}`);
    const deletedReview = await this.reviewService.deleteReviewById(reviewId);
    this.logger.log(`Review deleted with ID: '${deletedReview.id}'`);

    return fillDto(ReviewDto, deletedReview.toPOJO());
  }
}

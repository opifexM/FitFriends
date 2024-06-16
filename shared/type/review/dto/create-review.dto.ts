import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { REVIEW } from '../review.constant';

export class CreateReviewDto {
  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public user: string;

  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the training',
  })
  public training: string;

  @IsNumber()
  @Min(REVIEW.RATING.MIN)
  @Max(REVIEW.RATING.MAX)
  @ApiProperty({
    example: 3,
    description: 'The number of rating',
    minimum: REVIEW.RATING.MIN,
    maximum: REVIEW.RATING.MAX,
  })
  public rating: number;

  @IsString()
  @Length(REVIEW.TEXT.MIN, REVIEW.TEXT.MAX)
  @ApiProperty({
    example:
      'The training session was incredibly informative and engaging. The coach demonstrated deep knowledge and provided practical insights. The interactive activities helped reinforce the concepts, making it easier to apply them in real-world scenarios. Overall, it was a highly valuable experience.',
    description: 'The text of the review',
    minLength: REVIEW.TEXT.MIN,
    maxLength: REVIEW.TEXT.MAX,
  })
  public text: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ReviewDto } from './review.dto';

export class ReviewPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of review entities',
    type: [ReviewDto],
  })
  public entities: ReviewDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available reviews',
    example: 5,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Page number of the review pagination',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of review across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of review per page',
    example: 10,
  })
  public itemsPerPage: number;
}

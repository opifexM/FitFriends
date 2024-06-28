import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { SortDirection } from '../sort-direction.interface';
import { ReviewSortType } from './review-sort-type.enum';

export class ReviewQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number of the review pagination',
    example: 1,
  })
  public currentPage?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit the number of review returned',
    example: 10,
  })
  public limit?: number;

  @IsOptional()
  @IsEnum(ReviewSortType)
  @ApiPropertyOptional({
    description: 'Type of sorting to be applied to the review list',
    enum: ReviewSortType,
    example: ReviewSortType.BY_DATE,
  })
  public sortType?: ReviewSortType;

  @ApiPropertyOptional({
    description: 'Direction of review sorting (ASC or DESC)',
    enum: SortDirection,
    example: SortDirection.ASC,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection;
}

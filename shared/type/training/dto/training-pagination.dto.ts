import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingDto } from './training.dto';

export class TrainingPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of Training entities',
    type: [TrainingDto],
  })
  public entities: TrainingDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available trainings',
    example: 5,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Page number of the training pagination',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of trainings across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of trainings per page',
    example: 10,
  })
  public itemsPerPage: number;

  @Expose()
  @ApiProperty({
    description: 'Minimum price of the trainings',
    example: 10,
  })
  public priceMin: number;

  @Expose()
  @ApiProperty({
    description: 'Maximum price of the trainings',
    example: 100,
  })
  public priceMax: number;

  @Expose()
  @ApiProperty({
    description: 'Minimum calories burned in the trainings',
    example: 100,
  })
  public caloriesMin: number;

  @Expose()
  @ApiProperty({
    description: 'Maximum calories burned in the trainings',
    example: 1000,
  })
  public caloriesMax: number;

  @Expose()
  @ApiProperty({
    description: 'Minimum rating of the trainings',
    example: 1,
  })
  public ratingMin: number;

  @Expose()
  @ApiProperty({
    description: 'Maximum rating of the trainings',
    example: 5,
  })
  public ratingMax: number;
}

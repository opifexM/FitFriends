import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingDto } from '../../training/dto/training.dto';

export class MyOrderDto {
  @Expose()
  @ApiProperty({
    description: 'Training Order entity',
    type: TrainingDto,
  })
  public training: TrainingDto;

  @Expose()
  @ApiProperty({
    description: 'The total amount of purchased trainings',
    example: 800,
  })
  public totalAmount: number;

  @Expose()
  @ApiProperty({
    description: 'The total number of purchased trainings',
    example: 3,
  })
  public totalNumber: number;
}

export class MyOrderPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of Training Order entities',
    type: [MyOrderDto],
  })
  public entities: MyOrderDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available training orders',
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
    description: 'Total number of training orders across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of training orders per page',
    example: 10,
  })
  public itemsPerPage: number;
}

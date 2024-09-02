import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PublicUserDto } from './public-user.dto';

export class PublicUserPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of users entities',
    type: [PublicUserDto],
  })
  public entities: PublicUserDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available users',
    example: 5,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Page number of the user pagination',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of users across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of users per page',
    example: 10,
  })
  public itemsPerPage: number;
}

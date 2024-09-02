import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FriendDto } from './friend.dto';

export class FriendPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of friend connection entities',
    type: [FriendDto],
  })
  public entities: FriendDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available friend connections',
    example: 5,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Page number of the friend connection pagination',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of friend connection across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of friend connection per page',
    example: 10,
  })
  public itemsPerPage: number;
}

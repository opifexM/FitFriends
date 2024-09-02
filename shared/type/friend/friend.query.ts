import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class FriendQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number of friend connection pagination',
    example: 1,
  })
  public currentPage?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit the number of friend connection returned',
    example: 10,
  })
  public limit?: number;
}

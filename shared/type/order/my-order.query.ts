import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { SortDirection } from '../sort-direction.interface';
import { OrderSortType } from './order-sort-type.enum';

export class MyOrderQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number of the training order pagination',
    example: 1,
  })
  public currentPage?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit the number of training order returned',
    example: 4,
  })
  public limit?: number;

  @IsOptional()
  @IsEnum(OrderSortType)
  @ApiPropertyOptional({
    description: 'Type of sorting to be applied to the training order list',
    enum: OrderSortType,
    example: OrderSortType.BY_COUNT,
  })
  public sortType?: OrderSortType;

  @ApiPropertyOptional({
    description: 'Direction of review sorting (ASC or DESC)',
    enum: SortDirection,
    example: SortDirection.ASC,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection;
}

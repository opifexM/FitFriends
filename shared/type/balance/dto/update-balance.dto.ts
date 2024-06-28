import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBalanceDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The total number of trainings',
  })
  public totalCount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'The number of available trainings',
  })
  public availableCount?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBalanceDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'The number of available training',
  })
  public count?: number;
}

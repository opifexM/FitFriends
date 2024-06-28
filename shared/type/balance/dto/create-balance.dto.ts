import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the training',
  })
  public training: string;

  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The total number of trainings',
  })
  public totalCount: number;

  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'The number of available trainings',
  })
  public availableCount: number;
}

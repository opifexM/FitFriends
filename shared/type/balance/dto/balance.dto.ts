import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PurchaseStatusType } from '../../enum/purchase-status-type.enum';

export class BalanceDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the balance',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public user: string;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the training',
  })
  public training: string;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The total number of trainings',
  })
  public totalCount: number;

  @Expose()
  @ApiProperty({
    example: 5,
    description: 'The number of available trainings',
  })
  public availableCount: number;

  @Expose()
  @ApiProperty({
    example: PurchaseStatusType.IN_PROGRESS,
    description: 'The status type of purchase',
    enum: PurchaseStatusType,
  })
  public purchaseStatus: PurchaseStatusType;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the balance was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the balance was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

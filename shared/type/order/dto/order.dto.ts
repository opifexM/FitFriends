import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaymentType } from '../../enum/payment-type.enum';
import { PurchaseType } from '../../enum/purchase-type.enum';

export class OrderDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the questionnaire',
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
    example: PurchaseType.SUBSCRIPTION,
    description: 'The type of purchase',
    enum: PurchaseType,
  })
  public purchase: PurchaseType;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'The unique identifier of the service',
  })
  public service: string;

  @Expose()
  @ApiProperty({
    example: 4,
    description: 'The price of the service',
  })
  public price: number;

  @Expose()
  @ApiProperty({
    example: 2,
    description: 'The quantity of the service purchased',
  })
  public count: number;

  @Expose()
  @ApiProperty({
    example: PaymentType.VISA,
    description: 'The method of payment',
    enum: PaymentType,
  })
  public payment: PaymentType;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the order was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the order was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

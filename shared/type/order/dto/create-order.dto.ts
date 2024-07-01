import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { PaymentType } from '../../enum/payment-type.enum';
import { PurchaseType } from '../../enum/purchase-type.enum';
import { ORDER } from '../order.constant';

export class CreateOrderDto {
  @IsEnum(PurchaseType)
  @ApiProperty({
    example: PurchaseType.SUBSCRIPTION,
    description: 'The type of purchase',
    enum: PurchaseType,
  })
  public purchase: PurchaseType;

  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'The unique identifier of the service (training)',
  })
  public service: string;

  @IsNumber()
  @ApiProperty({
    example: 500,
    description: 'The total price of the order',
  })
  public totalPrice: number;

  @IsNumber()
  @Min(ORDER.COUNT.MIN)
  @Max(ORDER.COUNT.MAX)
  @ApiProperty({
    example: 2,
    description: 'The quantity of the service purchased',
    minimum: ORDER.COUNT.MIN,
    maximum: ORDER.COUNT.MAX,
  })
  public count: number;

  @IsEnum(PaymentType)
  @ApiProperty({
    example: PaymentType.VISA,
    description: 'The method of payment',
    enum: PaymentType,
  })
  public payment: PaymentType;
}

import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNumber, IsOptional, Max, Min,} from 'class-validator';
import {PaymentType} from "../../enum/payment-type.enum";
import {PurchaseType} from "../../enum/purchase-type.enum";
import {ORDER} from "../order.constant";

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(PurchaseType)
  @ApiProperty({
    example: PurchaseType.SUBSCRIPTION,
    description: 'The type of purchase',
    enum: PurchaseType,
  })
  public purchase?: PurchaseType;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 4,
    description: 'The price of the service',
  })
  public price?: number;

  @IsOptional()
  @IsNumber()
  @Min(ORDER.COUNT.MIN)
  @Max(ORDER.COUNT.MAX)
  @ApiProperty({
    example: 2,
    description: 'The quantity of the service purchased',
    minimum: ORDER.COUNT.MIN,
    maximum: ORDER.COUNT.MAX,
  })
  public count?: number;

  @IsOptional()
  @IsEnum(PaymentType)
  @ApiProperty({
    example: PaymentType.VISA,
    description: 'The method of payment',
    enum: PaymentType,
  })
  public payment?: PaymentType;
}

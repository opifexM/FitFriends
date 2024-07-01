import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto';
import { OrderDto } from 'shared/type/order/dto/order.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createOrder(
    @Body() dto: CreateOrderDto,
    @GetUserId() userId: string,
  ): Promise<OrderDto> {
    this.logger.log('Creating new order');
    const createdOrder = await this.orderService.createOrder(userId, dto);

    return fillDto(OrderDto, createdOrder.toPOJO());
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully retrieved.',
    type: OrderDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  public async getOrder(
    @Param('orderId', MongoIdValidationPipe) orderId: string,
    @GetUserId() userId: string,
  ): Promise<OrderDto> {
    this.logger.log(`Retrieving order with ID: '${orderId}'`);
    const foundOrder = await this.orderService.findOrderById(userId, orderId);

    return fillDto(OrderDto, foundOrder.toPOJO());
  }
}

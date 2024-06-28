import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto';
import { UpdateOrderDto } from 'shared/type/order/dto/update-order.dto';
import { TrainingService } from '../training/training.service';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { OrderEntity } from './entity/order.entity';
import { OrderFactory } from './entity/order.factory';
import { OrderRepository } from './entity/order.repository';
import { ORDER_MESSAGES } from './order.constant';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService,
  ) {}

  public async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const { purchase, service, payment, price, count } = dto;
    this.logger.log('Attempting to create order');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundTraining = await this.trainingService.findTrainingById(service);
    if (!foundTraining) {
      this.logger.warn(`Training with id '${service}' not found`);
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    const totalPrice = price * count;
    const orderData = {
      user: foundUser.id,
      count: count,
      payment: payment,
      price: price,
      purchase: purchase,
      service: foundTraining.id,
      totalPrice: totalPrice,
    };

    const orderEntity = OrderFactory.createEntity(orderData);
    const createdOrder = await this.orderRepository.save(orderEntity);
    this.logger.log(`Order created with ID: '${createdOrder.id}'`);

    return createdOrder;
  }

  public async findOrderById(
    userId: string,
    orderId: string,
  ): Promise<OrderEntity> {
    this.logger.log(`Looking for order with ID: '${orderId}'`);
    const foundOrder = await this.orderRepository.findById(orderId);
    if (!foundOrder) {
      this.logger.warn(`Order not found with ID: '${orderId}'`);
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }
    if (userId !== foundOrder.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' do not have access to order ID '${orderId}'`,
      );
      throw new ForbiddenException(ORDER_MESSAGES.NO_ACCESS);
    }

    return foundOrder;
  }

  public async updateOrderById(
    userId: string,
    orderId: string,
    dto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    this.logger.log(`Updating order with ID: '${orderId}'`);
    const updatedOrder = await this.findOrderById(userId, orderId);

    if (dto.purchase !== undefined) updatedOrder.purchase = dto.purchase;
    if (dto.price !== undefined) updatedOrder.price = dto.price;
    if (dto.count !== undefined) updatedOrder.count = dto.count;
    if (dto.payment !== undefined) updatedOrder.payment = dto.payment;

    return this.orderRepository.update(orderId, updatedOrder);
  }

  public async deleteOrderById(
    userId: string,
    orderId: string,
  ): Promise<OrderEntity> {
    this.logger.log(`Deleting order with ID: '${orderId}'`);
    await this.findOrderById(userId, orderId);

    const deletedOrder = await this.orderRepository.deleteById(orderId);
    this.logger.log(`Order with ID: '${orderId}' deleted`);

    return deletedOrder;
  }

  public async exists(orderId: string): Promise<boolean> {
    return this.orderRepository.exists(orderId);
  }
}

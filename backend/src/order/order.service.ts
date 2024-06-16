import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto';
import { UpdateOrderDto } from 'shared/type/order/dto/update-order.dto';
import { TRAINING_MESSAGES } from '../training/training.constant';
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

  public async createOrder(dto: CreateOrderDto): Promise<OrderEntity> {
    const { purchase, service, payment, price, count, user } = dto;
    this.logger.log('Attempting to create order');

    const foundUser = await this.userService.findUserById(user);
    if (!foundUser) {
      this.logger.warn(`User with id '${user}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundTraining = await this.trainingService.findTrainingById(service);
    if (!foundTraining) {
      this.logger.warn(`Training with id '${service}' not found`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
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

  public async findOrderById(orderId: string): Promise<OrderEntity> {
    this.logger.log(`Looking for order with ID: '${orderId}'`);
    const foundOrder = await this.orderRepository.findById(orderId);
    if (!foundOrder) {
      this.logger.warn(`Order not found with ID: '${orderId}'`);
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    return foundOrder;
  }

  public async updateOrderById(
    orderId: string,
    dto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    this.logger.log(`Updating order with ID: '${orderId}'`);
    const updatedOrder = await this.findOrderById(orderId);

    if (dto.purchase !== undefined) updatedOrder.purchase = dto.purchase;
    if (dto.price !== undefined) updatedOrder.price = dto.price;
    if (dto.count !== undefined) updatedOrder.count = dto.count;
    if (dto.payment !== undefined) updatedOrder.payment = dto.payment;

    return this.orderRepository.update(orderId, updatedOrder);
  }

  public async deleteOrderById(orderId: string): Promise<OrderEntity> {
    this.logger.log(`Deleting order with ID: '${orderId}'`);
    const foundOrder = await this.orderRepository.findById(orderId);
    if (!foundOrder) {
      this.logger.warn(`Order not found with ID: '${orderId}'`);
      throw new NotFoundException(ORDER_MESSAGES.NOT_FOUND);
    }

    const deletedOrder = await this.orderRepository.deleteById(orderId);
    this.logger.log(`Order with ID: '${orderId}' deleted`);

    return deletedOrder;
  }

  public async exists(orderId: string): Promise<boolean> {
    return this.orderRepository.exists(orderId);
  }
}

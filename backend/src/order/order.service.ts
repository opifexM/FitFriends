import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PaymentStatusType } from 'shared/type/enum/payment-status-type.enum';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto';
import { BalanceService } from '../balance/balance.service';
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
    private readonly balanceService: BalanceService,
  ) {}

  public async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const { purchase, service, payment, count, totalPrice } = dto;
    this.logger.log('Attempting to create order');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const foundTraining = await this.trainingService.findTrainingById(service);
    if (!foundTraining) {
      this.logger.warn(`Training with id '${service}' not found`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    const expectedTotalPrice = foundTraining.isSpecialOffer
      ? count *
        Math.trunc(
          foundTraining.price -
            (foundTraining.price * foundTraining.discountPercent) / 100,
        )
      : count * foundTraining.price;

    if (totalPrice !== expectedTotalPrice) {
      this.logger.warn(
        `The total price '${totalPrice}' does not match the expected price '${expectedTotalPrice}'`,
      );
      throw new NotFoundException(ORDER_MESSAGES.PRICE_NOT_MATCH);
    }

    const orderData = {
      user: foundUser.id,
      count: count,
      payment: payment,
      price: foundTraining.price,
      purchase: purchase,
      service: foundTraining.id,
      totalPrice: expectedTotalPrice,
      paymentStatus: PaymentStatusType.PAID,
    };

    const orderEntity = OrderFactory.createEntity(orderData);
    const createdOrder = await this.orderRepository.save(orderEntity);
    this.logger.log(
      `Order created with ID: '${createdOrder.id}' for user '${foundUser.name}'`,
    );

    await this.balanceService.createOrUpdateBalance(
      foundUser,
      foundTraining,
      count,
    );

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

  public async exists(orderId: string): Promise<boolean> {
    return this.orderRepository.exists(orderId);
  }
}

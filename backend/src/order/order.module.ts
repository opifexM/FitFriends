import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceModule } from '../balance/balance.module';
import { TrainingModule } from '../training/traning.module';
import { UserModule } from '../user/user.module';
import { OrderRepository } from './entity/order.repository';
import { OrderModel, OrderSchema } from './entity/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    UserModule,
    TrainingModule,
    BalanceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}

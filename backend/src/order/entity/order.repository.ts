import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { MyOrderQuery } from 'shared/type/order/my-order.query';
import { OrderSortType } from 'shared/type/order/order-sort-type.enum';
import { SortDirection } from 'shared/type/sort-direction.interface';
import { BaseRepository } from '../../database/base-mongo.repository';
import { TrainingEntity } from '../../training/entity/training.entity';
import { MyOrder, MyOrderPagination } from '../my-order-pagination.interface';
import { OrderEntity } from './order.entity';
import { OrderFactory } from './order.factory';
import { OrderModel } from './order.schema';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(
    @InjectModel(OrderModel.name)
    private orderModel: Model<OrderModel>,
  ) {
    super(orderModel as any, OrderRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): OrderEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return OrderFactory.createEntity(plainObject);
  }

  public async findMyOrderByQuery(
    trainingList: TrainingEntity[],
    { limit, currentPage, sortType, sortDirection }: MyOrderQuery,
  ): Promise<MyOrderPagination<TrainingEntity>> {
    const trainingData: MyOrder<TrainingEntity>[] = await Promise.all(
      trainingList.map(async (training) => {
        const aggregationResult = await this.model.aggregate([
          { $match: { service: training.id } },
          {
            $group: {
              _id: null,
              totalNumber: { $sum: '$count' },
              totalAmount: { $sum: '$totalPrice' },
            },
          },
        ]);
        const { totalNumber = 0, totalAmount = 0 } = aggregationResult[0] || {};

        return {
          training: training,
          totalNumber: totalNumber,
          totalAmount: totalAmount,
        };
      }),
    );
    this.logger.log(`Retrieved [${trainingData.length}] training orders`);

    if (sortType === OrderSortType.BY_PRICE) {
      trainingData.sort((a, b) =>
        sortDirection === SortDirection.ASC
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount,
      );
    } else if (sortType === OrderSortType.BY_COUNT) {
      trainingData.sort((a, b) =>
        sortDirection === SortDirection.ASC
          ? a.totalNumber - b.totalNumber
          : b.totalNumber - a.totalNumber,
      );
    }

    const skip = (currentPage - 1) * limit;
    const paginatedData = trainingData.slice(skip, skip + limit);

    return {
      entities: paginatedData,
      totalPages: Math.ceil(trainingData.length / limit),
      currentPage: currentPage,
      totalItems: trainingData.length,
      itemsPerPage: limit,
    };
  }
}

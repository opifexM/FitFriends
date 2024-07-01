import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { BalanceEntity } from './balance.entity';
import { BalanceFactory } from './balance.factory';
import { BalanceModel } from './balance.schema';

@Injectable()
export class BalanceRepository extends BaseRepository<BalanceEntity> {
  constructor(
    @InjectModel(BalanceModel.name)
    private balanceModel: Model<BalanceModel>,
  ) {
    super(balanceModel as any, BalanceRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): BalanceEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return BalanceFactory.createEntity(plainObject);
  }

  public async findByUserIdAndTrainingId(
    userId: string,
    trainingId: string,
  ): Promise<BalanceEntity | null> {
    this.logger.log(
      `Finding balance by user ID: '${userId}', training ID: '${trainingId}'`,
    );

    const foundDocument = await this.balanceModel
      .findOne({
        user: userId,
        training: trainingId,
      })
      .sort({ createdAt: -1 });

    return this.createEntityFromDocument(foundDocument);
  }

  public async findAllByUserId(
    userId: string,
    isActive: boolean,
  ): Promise<string[]> {
    this.logger.log(
      `Finding all purchase training by user ID: '${userId}', active: '${isActive}'`,
    );

    const filterCriteria: any = { user: userId };
    if (isActive) {
      filterCriteria['availableCount'] = { $gt: 0 };
    }

    const foundDocument = await this.balanceModel
      .find(filterCriteria)
      .populate('training');
    this.logger.log(`Retrieved [${foundDocument.length}] purchase trainings`);

    return foundDocument.map((balance) => balance.training.id);
  }
}

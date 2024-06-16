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
}

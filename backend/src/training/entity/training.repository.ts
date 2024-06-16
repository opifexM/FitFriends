import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { TrainingModel } from './training.schema';

@Injectable()
export class TrainingRepository extends BaseRepository<TrainingEntity> {
  constructor(
    @InjectModel(TrainingModel.name)
    private trainingModel: Model<TrainingModel>,
  ) {
    super(trainingModel as any, TrainingRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): TrainingEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return TrainingFactory.createEntity(plainObject);
  }
}

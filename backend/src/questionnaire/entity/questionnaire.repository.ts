import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseRepository } from '../../database/base-mongo.repository';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireFactory } from './questionnaire.factory';
import { QuestionnaireModel } from './questionnaire.schema';

@Injectable()
export class QuestionnaireRepository extends BaseRepository<QuestionnaireEntity> {
  constructor(
    @InjectModel(QuestionnaireModel.name)
    private questionnaireModel: Model<QuestionnaireModel>,
  ) {
    super(questionnaireModel as any, QuestionnaireRepository.name);
  }

  protected createEntityFromDocument(
    entityDocument: Document,
  ): QuestionnaireEntity | null {
    if (!entityDocument) {
      return null;
    }

    const plainObject = entityDocument.toObject({ versionKey: false });
    return QuestionnaireFactory.createEntity(plainObject);
  }

  public async findByUserId(
    userId: string,
  ): Promise<QuestionnaireEntity | null> {
    this.logger.log(`Finding questionnaire by user ID: '${userId}'`);
    const foundDocument = await this.questionnaireModel
      .findOne({
        user: userId,
      })
      .sort({ createdAt: -1 });

    return this.createEntityFromDocument(foundDocument);
  }
}

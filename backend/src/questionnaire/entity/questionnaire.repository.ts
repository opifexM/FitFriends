import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Promise } from 'mongoose';
import { PaginationResult } from 'shared/type/pagination.interface';
import { BaseRepository } from '../../database/base-mongo.repository';
import { TrainingEntity } from '../../training/entity/training.entity';
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

  public async findAllLookingForTraining(
    userId: string,
  ): Promise<PaginationResult<QuestionnaireEntity>> {
    this.logger.log(`Retrieving 'looking for training' questionnaire list'`);

    const filterCriteria = {
      isReadyForTraining: true,
      user: { $ne: userId },
    };

    const questionnaires = await this.questionnaireModel.find(filterCriteria);
    this.logger.log(`Retrieved [${questionnaires.length}] questionnaires`);

    return {
      entities: questionnaires.map((training) =>
        this.createEntityFromDocument(training),
      ),
      currentPage: 1,
      itemsPerPage: questionnaires.length,
      totalItems: questionnaires.length,
      totalPages: 1,
    };
  }
}

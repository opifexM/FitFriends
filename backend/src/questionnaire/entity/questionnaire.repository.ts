import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Promise, Types } from 'mongoose';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { PaginationResult } from 'shared/type/pagination.interface';
import { SortDirection } from 'shared/type/sort-direction.interface';
import { PublicUserSortType } from 'shared/type/user/public-user-sort-type.enum';
import { PublicUserQuery } from 'shared/type/user/public-user.query';
import { BaseRepository } from '../../database/base-mongo.repository';
import { UserModel } from '../../user/entity/user.schema';
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
    limit: number,
  ): Promise<PaginationResult<QuestionnaireEntity>> {
    this.logger.log(`Retrieving 'looking for training' questionnaire list'`);

    const filterCriteria = {
      isReadyForTraining: true,
      user: { $ne: userId },
    };

    const questionnaires = await this.questionnaireModel
      .find(filterCriteria)
      .limit(limit);
    this.logger.log(`Retrieved [${questionnaires.length}] questionnaires`);

    return {
      entities: questionnaires.map((questionnaire) =>
        this.createEntityFromDocument(questionnaire),
      ),
      currentPage: 1,
      itemsPerPage: questionnaires.length,
      totalItems: questionnaires.length,
      totalPages: 1,
    };
  }

  public async findPublicUserQuestionnaires(
    userId: string,
    {
      currentPage,
      limit,
      workout,
      skillLevel,
      location,
      publicUserSortType,
    }: PublicUserQuery,
  ): Promise<PaginationResult<QuestionnaireEntity>> {
    this.logger.log(`Retrieving public user questionnaire list`);

    const sortCriteria: { [key: string]: SortDirection } = {};
    if (publicUserSortType === PublicUserSortType.BY_USER) {
      sortCriteria['user.role'] = SortDirection.ASC;
    } else if (publicUserSortType === PublicUserSortType.BY_COACH) {
      sortCriteria['user.role'] = SortDirection.DESC;
    } else if (publicUserSortType === PublicUserSortType.BY_DATE) {
      sortCriteria['user.createdAt'] = SortDirection.DESC;
    }

    const filterCriteria: { [key: string]: any } = {};
    filterCriteria['_id'] = { $ne: userId };
    if (workout && workout.length > 0) {
      filterCriteria['workout'] = { $in: workout };
    }
    if (skillLevel) {
      filterCriteria['skillLevel'] = skillLevel;
    }

    const skip = (currentPage - 1) * limit;
    this.logger.log(
      `Retrieving public user questionnaire filterCriteria: '${JSON.stringify(filterCriteria)}', sortCriteria: '${JSON.stringify(sortCriteria)}', skip: '${skip}', limit: '${limit}'`,
    );

    const questionnaires = await this.model
      .find(filterCriteria)
      .populate('user')
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const filteredQuestionnaires = questionnaires.filter(
      (questionnaire: QuestionnaireModel & { user: UserModel }) => {
        if (location && location.length > 0) {
          return location.includes(questionnaire.user.location);
        }
        return false;
      },
    );

    filteredQuestionnaires.sort(
      (
        a: QuestionnaireModel & { user: UserModel },
        b: QuestionnaireModel & { user: UserModel },
      ) => {
        if (publicUserSortType === PublicUserSortType.BY_COACH) {
          return a.user.role.localeCompare(b.user.role);
        } else if (publicUserSortType === PublicUserSortType.BY_USER) {
          return b.user.role.localeCompare(a.user.role);
        }
        return 0;
      },
    );

    const totalItem =
      await this.questionnaireModel.countDocuments(filterCriteria);

    this.logger.log(`Retrieved [${filteredQuestionnaires.length}] users`);

    return {
      entities: filteredQuestionnaires.map((questionnaire) =>
        this.createEntityFromDocument(questionnaire),
      ),
      totalPages: Math.ceil(totalItem / limit),
      currentPage: currentPage,
      totalItems: totalItem,
      itemsPerPage: limit,
    };
  }
}

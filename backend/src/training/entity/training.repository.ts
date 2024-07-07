import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Model, Promise } from 'mongoose';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { PaginationResult } from 'shared/type/pagination.interface';
import { SortDirection } from 'shared/type/sort-direction.interface';
import { TrainingSortType } from 'shared/type/training/training-sort-type.enum';
import { TrainingQuery } from 'shared/type/training/training.query';
import { BaseRepository } from '../../database/base-mongo.repository';
import { TrainingPaginationInterface } from './training-pagination.interface';
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

  public async findById(id: string): Promise<TrainingEntity | null> {
    this.logger.log(`Finding training by ID: '${id}'`);
    const foundDocument = await this.model.findById(new ObjectId(id)).populate({
      path: 'coach',
      select: 'name avatarId profilePictureId',
    });

    return this.createEntityFromDocument(foundDocument);
  }

  public async findAllByQuery({
    currentPage,
    caloriesFrom,
    caloriesTo,
    priceFrom,
    priceTo,
    trainingSortType,
    workout,
    ratingFrom,
    ratingTo,
    limit,
  }: TrainingQuery): Promise<TrainingPaginationInterface<TrainingEntity>> {
    const sortCriteria: { [key: string]: SortDirection } = {};
    if (trainingSortType === TrainingSortType.BY_HIGH_PRICE) {
      sortCriteria['price'] = SortDirection.ASC;
    } else if (trainingSortType === TrainingSortType.BY_LOW_PRICE) {
      sortCriteria['price'] = SortDirection.DESC;
    } else if (trainingSortType === TrainingSortType.BY_DATE) {
      sortCriteria['createdAt'] = SortDirection.ASC;
    }

    const filterCriteria: { [key: string]: any } = {};
    if (workout && workout.length > 0) {
      filterCriteria['workout'] = { $in: workout };
    }

    const { priceStats, caloriesStats, ratingStats } =
      await this.calculateRestrictionRange(filterCriteria);

    if (priceFrom !== undefined) {
      filterCriteria['price'] = { ...filterCriteria['price'], $gte: priceFrom };
    }
    if (priceTo !== undefined) {
      filterCriteria['price'] = { ...filterCriteria['price'], $lte: priceTo };
    }
    if (trainingSortType === TrainingSortType.BY_FREE_PRICE) {
      filterCriteria['price'] = {
        ...filterCriteria['price'],
        $lte: 0,
        $gte: 0,
      };
    }
    if (caloriesFrom !== undefined) {
      filterCriteria['caloriesBurned'] = {
        ...filterCriteria['caloriesBurned'],
        $gte: caloriesFrom,
      };
    }
    if (caloriesTo !== undefined) {
      filterCriteria['caloriesBurned'] = {
        ...filterCriteria['caloriesBurned'],
        $lte: caloriesTo,
      };
    }
    if (ratingFrom !== undefined) {
      filterCriteria['rating'] = {
        ...filterCriteria['rating'],
        $gte: ratingFrom,
      };
    }
    if (ratingTo !== undefined) {
      filterCriteria['rating'] = {
        ...filterCriteria['rating'],
        $lte: ratingTo,
      };
    }

    const skip = (currentPage - 1) * limit;
    this.logger.log(
      `Retrieving trainings filterCriteria: '${JSON.stringify(filterCriteria)}', sortCriteria: '${JSON.stringify(sortCriteria)}', skip: '${skip}', limit: '${limit}'`,
    );

    const trainings = await this.model
      .find(filterCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const totalItem = await this.model.countDocuments(filterCriteria);

    this.logger.log(`Retrieved [${trainings.length}] trainings`);

    return {
      entities: trainings.map((training) =>
        this.createEntityFromDocument(training),
      ),
      totalPages: Math.ceil(totalItem / limit),
      currentPage: currentPage,
      totalItems: totalItem,
      itemsPerPage: limit,
      priceMin: priceStats[0]?.minPrice || 0,
      priceMax: priceStats[0]?.maxPrice || 0,
      caloriesMin: caloriesStats[0]?.minCaloriesBurned || 0,
      caloriesMax: caloriesStats[0]?.maxCaloriesBurned || 0,
      ratingMin: ratingStats[0]?.minRating || 0,
      ratingMax: ratingStats[0]?.maxRating || 0,
    };
  }

  private async calculateRestrictionRange(filterCriteria: {
    [p: string]: any;
  }): Promise<{
    caloriesStats: Array<any>;
    priceStats: Array<any>;
    ratingStats: Array<any>;
  }> {
    const priceStats = await this.model.aggregate([
      { $match: filterCriteria },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    const caloriesStats = await this.model.aggregate([
      { $match: filterCriteria },
      {
        $group: {
          _id: null,
          minCaloriesBurned: { $min: '$caloriesBurned' },
          maxCaloriesBurned: { $max: '$caloriesBurned' },
        },
      },
    ]);

    const ratingStats = await this.model.aggregate([
      { $match: filterCriteria },
      {
        $group: {
          _id: null,
          minRating: { $min: '$rating' },
          maxRating: { $max: '$rating' },
        },
      },
    ]);
    return { priceStats, caloriesStats, ratingStats };
  }

  public async findAllByTrainingList(
    trainingListIds: string[],
    currentPage: number,
    limit: number,
  ): Promise<PaginationResult<TrainingEntity>> {
    const skip = (currentPage - 1) * limit;
    this.logger.log(
      `Retrieving trainings by list ids '[${trainingListIds.length}]', skip: '${skip}', limit: '${limit}'`,
    );

    const filterCriteria = {
      _id: { $in: trainingListIds },
    };

    const trainings = await this.model
      .find(filterCriteria)
      .skip(skip)
      .limit(limit);

    const trainingItem = await this.model.countDocuments(filterCriteria);

    this.logger.log(`Retrieved [${trainings.length}] trainings`);

    return {
      entities: trainings.map((training) =>
        this.createEntityFromDocument(training),
      ),
      totalPages: Math.ceil(trainingItem / limit),
      currentPage: currentPage,
      totalItems: trainingItem,
      itemsPerPage: limit,
    };
  }

  public async findAllByWorkoutList(
    workouts: WorkoutType[],
  ): Promise<PaginationResult<TrainingEntity>> {
    this.logger.log(
      `Retrieving 'special for you training' by list ids '[${workouts.length}]'`,
    );

    const filterCriteria = {
      workout: { $in: workouts },
    };

    const trainings = await this.model.find(filterCriteria);
    const trainingEntities = trainings.map((training) =>
      this.createEntityFromDocument(training),
    );

    const uniqueTrainings = Array.from(
      new Map(
        trainingEntities.map((training) => [training.workout, training]),
      ).values(),
    );
    this.logger.log(`Retrieved [${uniqueTrainings.length}] trainings`);

    return {
      currentPage: 1,
      itemsPerPage: uniqueTrainings.length,
      totalItems: uniqueTrainings.length,
      totalPages: 1,
      entities: uniqueTrainings,
    };
  }
}

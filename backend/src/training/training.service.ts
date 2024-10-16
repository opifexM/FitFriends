import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { PaginationResult } from 'shared/type/pagination.interface';
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto';
import { UpdateTrainingDto } from 'shared/type/training/dto/update-training.dto';
import { TrainingQuery } from 'shared/type/training/training.query';
import { TRAINING, TRAINING_LIST } from 'shared/type/training/traning.constant';
import { EmailService } from '../email/email.service';
import { FileService } from '../file-module/file.service';
import { QUESTIONNAIRE_MESSAGES } from '../questionnaire/questionnaire.constant';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { UserEntity } from '../user/entity/user.entity';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { TrainingPaginationInterface } from './entity/training-pagination.interface';
import { TrainingEntity } from './entity/training.entity';
import { TrainingFactory } from './entity/training.factory';
import { TrainingRepository } from './entity/training.repository';
import { TRAINING_DEFAULT, TRAINING_MESSAGES } from './training.constant';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly userService: UserService,
    private readonly questionnaireService: QuestionnaireService,
    private readonly fileService: FileService,
    private readonly emailService: EmailService,
  ) {}

  public async createTraining(
    userId: string,
    dto: CreateTrainingDto,
    videoFile?: Express.Multer.File,
  ): Promise<TrainingEntity> {
    const {
      name,
      backgroundId,
      skillLevel,
      workout,
      workoutDuration,
      price,
      caloriesBurned,
      description,
      gender,
      isSpecialOffer,
      discountPercent,
    } = dto;
    this.logger.log('Attempting to create training');

    const foundCoachUser = await this.userService.findUserById(userId);
    if (!foundCoachUser) {
      this.logger.warn(`User-coach with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundCoachUser.role !== RoleType.COACH) {
      this.logger.warn(`User '${foundCoachUser.name}' is not coach`);
      throw new NotFoundException(USER_MESSAGES.NOT_COACH);
    }

    const videoId = videoFile
      ? await this.fileService.uploadFile(
          videoFile,
          [...TRAINING.VIDEO.FORMATS],
          TRAINING.VIDEO.MAX_SIZE_KB,
        )
      : TRAINING_DEFAULT.VIDEO_ID;

    const trainingData = {
      name: name,
      skillLevel: skillLevel,
      workout: workout,
      workoutDuration: workoutDuration,
      price: price,
      caloriesBurned: caloriesBurned,
      description: description,
      gender: gender,
      isSpecialOffer: isSpecialOffer ?? false,
      rating: 0,
      coach: foundCoachUser.id,
      videoId: videoId,
      backgroundId: backgroundId ?? TRAINING_DEFAULT.BACKGROUND_ID,
      discountPercent: discountPercent ?? TRAINING_DEFAULT.DISCOUNT_PERCENT,
    };

    const trainingEntity = TrainingFactory.createEntity(trainingData);
    const createdTraining = await this.trainingRepository.save(trainingEntity);
    this.logger.log(`Training created with ID: '${createdTraining.id}'`);
    await this.formEmailMessageByTraining(foundCoachUser, trainingEntity);

    return createdTraining;
  }

  public async formEmailMessageByTraining(
    coachUser: UserEntity,
    training: TrainingEntity,
  ): Promise<void> {
    this.logger.log(
      `Forming [${coachUser.subscriptions.length}] emails for coach with ID: '${coachUser.id}'`,
    );

    const subscribedUsers = await this.userService.findUserSubscription(
      coachUser.subscriptions,
    );

    for (const user of subscribedUsers) {
      await this.emailService.createEmailMessage({
        emailFrom: 'notify@fit-friends.com',
        emailTo: user.email,
        text: `New training '${training.name}' from your coach ${coachUser.name} is waiting you!
        ${training.description}.
        Price: $${training.price}. Duration: ${training.workoutDuration} minutes.

        Coach ${coachUser.name}.
        `,
        topic: `New training '${training.name}'`,
      });
    }

    console.log(subscribedUsers);
  }

  public async findTrainingWithCoachById(
    trainingId: string,
  ): Promise<TrainingEntity> {
    this.logger.log(`Looking for training with coach with ID: '${trainingId}'`);
    const foundTraining =
      await this.trainingRepository.findWithCoachById(trainingId);
    if (!foundTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    return foundTraining;
  }

  public async findAllTrainingByCoachId(
    coachId: string,
  ): Promise<TrainingEntity[]> {
    this.logger.log(`Looking for all training by coachID: '${coachId}'`);

    return this.trainingRepository.findAllByCoachId(coachId);
  }

  public async findTrainingById(trainingId: string): Promise<TrainingEntity> {
    this.logger.log(`Looking for training with ID: '${trainingId}'`);
    const foundTraining = await this.trainingRepository.findById(trainingId);
    if (!foundTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    return foundTraining;
  }

  public async updateTrainingById(
    userId: string,
    trainingId: string,
    dto: UpdateTrainingDto,
    videoFile?: Express.Multer.File,
  ): Promise<TrainingEntity> {
    this.logger.log(`Updating training with ID: '${trainingId}'`);
    const updatedTraining = await this.findTrainingById(trainingId);
    if (!updatedTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }
    if (userId !== updatedTraining.coach.toString()) {
      this.logger.warn(
        `User ID '${userId}' attempted to training access owned by Coach ID '${updatedTraining.coach}'`,
      );
      throw new ForbiddenException(TRAINING_MESSAGES.NO_ACCESS);
    }

    updatedTraining.videoId = videoFile
      ? await this.fileService.uploadFile(
          videoFile,
          [...TRAINING.VIDEO.FORMATS],
          TRAINING.VIDEO.MAX_SIZE_KB,
        )
      : TRAINING_DEFAULT.VIDEO_ID;

    if (dto.name !== undefined) updatedTraining.name = dto.name;
    if (dto.backgroundId !== undefined)
      updatedTraining.backgroundId = dto.backgroundId;
    if (dto.skillLevel !== undefined)
      updatedTraining.skillLevel = dto.skillLevel;
    if (dto.workout !== undefined) updatedTraining.workout = dto.workout;
    if (dto.workoutDuration !== undefined)
      updatedTraining.workoutDuration = dto.workoutDuration;
    if (dto.price !== undefined) updatedTraining.price = dto.price;
    if (dto.caloriesBurned !== undefined)
      updatedTraining.caloriesBurned = dto.caloriesBurned;
    if (dto.description !== undefined)
      updatedTraining.description = dto.description;
    if (dto.gender !== undefined) updatedTraining.gender = dto.gender;
    if (dto.isSpecialOffer !== undefined)
      updatedTraining.isSpecialOffer = dto.isSpecialOffer;
    if (dto.discountPercent !== undefined)
      updatedTraining.discountPercent = dto.discountPercent;

    return this.trainingRepository.update(trainingId, updatedTraining);
  }

  public async deleteTrainingById(
    userId: string,
    trainingId: string,
  ): Promise<TrainingEntity> {
    this.logger.log(`Deleting training with ID: '${trainingId}'`);
    const foundTraining = await this.trainingRepository.findById(trainingId);
    if (!foundTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }
    if (userId !== foundTraining.coach.toString()) {
      this.logger.warn(
        `User ID '${userId}' attempted to training access owned by Coach ID '${foundTraining.coach.toString()}'`,
      );
      throw new ForbiddenException(TRAINING_MESSAGES.NO_ACCESS);
    }

    const deletedTraining =
      await this.trainingRepository.deleteById(trainingId);
    this.logger.log(`Training with ID: '${trainingId}' deleted`);

    return deletedTraining;
  }

  public async exists(trainingId: string): Promise<boolean> {
    return this.trainingRepository.exists(trainingId);
  }

  public async findTrainingByQuery(
    trainingQuery?: TrainingQuery,
  ): Promise<TrainingPaginationInterface<TrainingEntity>> {
    this.logger.log('Finding training by query');

    const limit = Math.min(
      trainingQuery?.limit ?? Number.MAX_VALUE,
      TRAINING_LIST.LIMIT,
    );
    const currentPage =
      trainingQuery?.currentPage ?? TRAINING_LIST.DEFAULT_FILTER_PAGE;
    const priceFrom = trainingQuery?.priceFrom;
    const priceTo = trainingQuery?.priceTo;
    const caloriesFrom = trainingQuery?.caloriesFrom;
    const caloriesTo = trainingQuery?.caloriesTo;
    const ratingFrom = trainingQuery?.ratingFrom;
    const ratingTo = trainingQuery?.ratingTo;
    const workout = trainingQuery?.workout;
    const trainingSortType =
      trainingQuery?.trainingSortType ?? TRAINING_LIST.DEFAULT_SORT_TYPE;
    const coachId = trainingQuery?.coachId;

    return this.trainingRepository.findAllByQuery({
      limit,
      currentPage,
      priceFrom,
      priceTo,
      caloriesFrom,
      caloriesTo,
      ratingFrom,
      ratingTo,
      workout,
      trainingSortType,
      coachId,
    });
  }

  public async findTrainingByIdList(
    trainingListIds: string[],
    page: number,
    limit: number,
  ): Promise<PaginationResult<TrainingEntity>> {
    this.logger.log(`Finding trainings by Id list [${trainingListIds}]`);

    return this.trainingRepository.findAllByTrainingList(
      trainingListIds,
      page,
      limit,
    );
  }

  public async findForYouTraining(
    userId: string,
  ): Promise<PaginationResult<TrainingEntity>> {
    const questionnaire =
      await this.questionnaireService.findLatestQuestionnaireByUserId(userId);
    if (!questionnaire) {
      this.logger.warn(`Questionnaire for user id '${userId}' not found`);
      throw new NotFoundException(QUESTIONNAIRE_MESSAGES.NOT_FOUND);
    }

    this.logger.log(
      `Finding 'special for you training' by Id list [${questionnaire.workout}]`,
    );

    return this.trainingRepository.findAllByWorkoutList(questionnaire.workout);
  }

  public async findSpecialTraining(): Promise<
    PaginationResult<TrainingEntity>
  > {
    this.logger.log(`Finding 'special price' trainings`);

    return this.trainingRepository.findAllBySpecial();
  }

  public async updateTrainingRatingById(
    trainingId: string,
    rating: number,
  ): Promise<TrainingEntity> {
    this.logger.log(
      `System updating training '${trainingId}' rating with '${rating}'`,
    );

    const updatedTraining = await this.findTrainingWithCoachById(trainingId);
    if (!updatedTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }
    updatedTraining.rating = rating;

    return this.trainingRepository.update(trainingId, updatedTraining);
  }
}

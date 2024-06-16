import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto';
import { UpdateTrainingDto } from 'shared/type/training/dto/update-training.dto';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { TrainingEntity } from './entity/training.entity';
import { TrainingFactory } from './entity/training.factory';
import { TrainingRepository } from './entity/training.repository';
import { TRAINING_MESSAGES } from './training.constant';

@Injectable()
export class TrainingService {
  private readonly logger = new Logger(TrainingService.name);

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly userService: UserService,
  ) {}

  public async createTraining(dto: CreateTrainingDto): Promise<TrainingEntity> {
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
      videoId,
      coach,
      isSpecialOffer,
    } = dto;
    this.logger.log('Attempting to create training');

    const foundCoachUser = await this.userService.findUserById(coach);
    if (!foundCoachUser) {
      this.logger.warn(`User-coach with id '${coach}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const trainingData = {
      name: name,
      backgroundId: backgroundId,
      skillLevel: skillLevel,
      workout: workout,
      workoutDuration: workoutDuration,
      price: price,
      caloriesBurned: caloriesBurned,
      description: description,
      gender: gender,
      videoId: videoId,
      isSpecialOffer: isSpecialOffer,
      rating: 0,
      coach: foundCoachUser.id,
    };

    const trainingEntity = TrainingFactory.createEntity(trainingData);
    const createdTraining = await this.trainingRepository.save(trainingEntity);
    this.logger.log(`Training created with ID: '${createdTraining.id}'`);

    return createdTraining;
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
    trainingId: string,
    dto: UpdateTrainingDto,
  ): Promise<TrainingEntity> {
    this.logger.log(`Updating training with ID: '${trainingId}'`);
    const updatedTraining = await this.findTrainingById(trainingId);

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
    if (dto.videoId !== undefined) updatedTraining.videoId = dto.videoId;
    if (dto.isSpecialOffer !== undefined)
      updatedTraining.isSpecialOffer = dto.isSpecialOffer;

    return this.trainingRepository.update(trainingId, updatedTraining);
  }

  public async deleteTrainingById(trainingId: string): Promise<TrainingEntity> {
    this.logger.log(`Deleting training with ID: '${trainingId}'`);
    const foundTraining = await this.trainingRepository.findById(trainingId);
    if (!foundTraining) {
      this.logger.warn(`Training not found with ID: '${trainingId}'`);
      throw new NotFoundException(TRAINING_MESSAGES.NOT_FOUND);
    }

    const deletedTraining =
      await this.trainingRepository.deleteById(trainingId);
    this.logger.log(`Training with ID: '${trainingId}' deleted`);

    return deletedTraining;
  }

  public async exists(trainingId: string): Promise<boolean> {
    return this.trainingRepository.exists(trainingId);
  }
}

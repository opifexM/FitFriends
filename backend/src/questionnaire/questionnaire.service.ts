import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionnaireDto } from 'shared/type/questionnaire/dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'shared/type/questionnaire/dto/update-questionnaire.dto';
import { USER_MESSAGES } from '../user/user.constant';
import { UserService } from '../user/user.service';
import { QuestionnaireEntity } from './entity/questionnaire.entity';
import { QuestionnaireFactory } from './entity/questionnaire.factory';
import { QuestionnaireRepository } from './entity/questionnaire.repository';
import { QUESTIONNAIRE_MESSAGES } from './questionnaire.constant';

@Injectable()
export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly userService: UserService,
  ) {}

  public async createQuestionnaire(
    userId: string,
    dto: CreateQuestionnaireDto,
  ): Promise<QuestionnaireEntity> {
    const {
      skillLevel,
      workout,
      workoutDuration,
      caloriesToLose,
      dailyCalorieBurn,
      isReadyForTraining,
    } = dto;
    this.logger.log('Attempting to create questionnaire');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    const questionnaireData = {
      user: foundUser.id,
      skillLevel: skillLevel,
      workout: workout,
      workoutDuration: workoutDuration,
      caloriesToLose: caloriesToLose,
      dailyCalorieBurn: dailyCalorieBurn,
      isReadyForTraining: isReadyForTraining ?? false,
    };

    const questionnaireEntity =
      QuestionnaireFactory.createEntity(questionnaireData);
    const createdQuestionnaire =
      await this.questionnaireRepository.save(questionnaireEntity);
    this.logger.log(
      `Questionnaire created with ID: '${createdQuestionnaire.id}'`,
    );

    return createdQuestionnaire;
  }

  public async findLatestQuestionnaireByUserId(
    userId: string,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(`Looking for last questionnaire with user ID: '${userId}'`);
    const foundQuestionnaire =
      await this.questionnaireRepository.findByUserId(userId);
    if (!foundQuestionnaire) {
      this.logger.warn(
        `Last questionnaire not found with user ID: '${userId}'`,
      );
      throw new NotFoundException(QUESTIONNAIRE_MESSAGES.NOT_FOUND);
    }

    return foundQuestionnaire;
  }

  public async findQuestionnaireById(
    questionnaireId: string,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(`Looking for questionnaire with ID: '${questionnaireId}'`);
    const foundQuestionnaire =
      await this.questionnaireRepository.findById(questionnaireId);
    if (!foundQuestionnaire) {
      this.logger.warn(`Questionnaire not found with ID: '${questionnaireId}'`);
      throw new NotFoundException(QUESTIONNAIRE_MESSAGES.NOT_FOUND);
    }

    return foundQuestionnaire;
  }

  public async updateQuestionnaireById(
    userId: string,
    questionnaireId: string,
    dto: UpdateQuestionnaireDto,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(`Updating questionnaire with ID: '${questionnaireId}'`);
    const updatedQuestionnaire =
      await this.findQuestionnaireById(questionnaireId);

    if (userId !== updatedQuestionnaire.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' attempted to questionnaire access owned by User ID '${updatedQuestionnaire.user.toString()}'`,
      );
      throw new ForbiddenException(QUESTIONNAIRE_MESSAGES.NO_ACCESS);
    }

    if (dto.skillLevel !== undefined)
      updatedQuestionnaire.skillLevel = dto.skillLevel;
    if (dto.workout !== undefined) updatedQuestionnaire.workout = dto.workout;
    if (dto.workoutDuration !== undefined)
      updatedQuestionnaire.workoutDuration = dto.workoutDuration;
    if (dto.caloriesToLose !== undefined)
      updatedQuestionnaire.caloriesToLose = dto.caloriesToLose;
    if (dto.dailyCalorieBurn !== undefined)
      updatedQuestionnaire.dailyCalorieBurn = dto.dailyCalorieBurn;
    if (dto.isReadyForTraining !== undefined)
      updatedQuestionnaire.isReadyForTraining = dto.isReadyForTraining;

    return this.questionnaireRepository.update(
      questionnaireId,
      updatedQuestionnaire,
    );
  }

  public async deleteQuestionnaireById(
    userId: string,
    questionnaireId: string,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(`Deleting questionnaire with ID: '${questionnaireId}'`);
    const foundQuestionnaire =
      await this.questionnaireRepository.findById(questionnaireId);
    if (!foundQuestionnaire) {
      this.logger.warn(`Questionnaire not found with ID: '${questionnaireId}'`);
      throw new NotFoundException(QUESTIONNAIRE_MESSAGES.NOT_FOUND);
    }
    if (userId !== foundQuestionnaire.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' attempted to questionnaire access owned by User ID '${foundQuestionnaire.user.toString()}'`,
      );
      throw new ForbiddenException(QUESTIONNAIRE_MESSAGES.NO_ACCESS);
    }

    const deletedQuestionnaire =
      await this.questionnaireRepository.deleteById(questionnaireId);
    this.logger.log(`Questionnaire with ID: '${questionnaireId}' deleted`);

    return deletedQuestionnaire;
  }

  public async exists(questionnaireId: string): Promise<boolean> {
    return this.questionnaireRepository.exists(questionnaireId);
  }
}

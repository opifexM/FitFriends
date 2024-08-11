import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { CreateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/create-coach-questionnaire.dto';
import { CreateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/create-visitor-questionnaire.dto';
import { UpdateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/update-coach-questionnaire.dto';
import { UpdateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/update-visitor-questionnaire.dto';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant';
import { FileService } from '../file-module/file.service';
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
    private readonly fileService: FileService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async createVisitorQuestionnaire(
    userId: string,
    dto: CreateVisitorQuestionnaireDto,
  ): Promise<QuestionnaireEntity> {
    const {
      skillLevel,
      workout,
      workoutDuration,
      caloriesToLose,
      dailyCalorieBurn,
    } = dto;
    this.logger.log('Attempting to create visitor questionnaire');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundUser.role !== RoleType.VISITOR) {
      this.logger.warn(
        `User '${userId}' is not visitor. Role: '${foundUser.role}'`,
      );
      throw new BadRequestException(QUESTIONNAIRE_MESSAGES.NO_VISITOR);
    }

    const questionnaireData = {
      user: foundUser.id,
      skillLevel: skillLevel,
      workout: workout,
      workoutDuration: workoutDuration,
      caloriesToLose: caloriesToLose,
      dailyCalorieBurn: dailyCalorieBurn,
      isReadyForTraining: true,
    };

    const questionnaireEntity =
      QuestionnaireFactory.createEntity(questionnaireData);
    const createdQuestionnaire =
      await this.questionnaireRepository.save(questionnaireEntity);

    this.logger.log(
      `Visitor questionnaire created with ID: '${createdQuestionnaire.id}'`,
    );

    return createdQuestionnaire;
  }

  public async createCoachQuestionnaire(
    userId: string,
    dto: CreateCoachQuestionnaireDto,
    certificateFiles: Express.Multer.File[],
  ): Promise<QuestionnaireEntity> {
    const { skillLevel, workout, isReadyForCoaching, experience } = dto;
    this.logger.log('Attempting to create coach questionnaire');

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundUser.role !== RoleType.COACH) {
      this.logger.warn(
        `User '${userId}' is not coach. Role: '${foundUser.role}'`,
      );
      throw new BadRequestException(QUESTIONNAIRE_MESSAGES.NO_COACH);
    }

    const certificateIds = await Promise.all(
      certificateFiles.map(async (file) => {
        return await this.fileService.uploadFile(
          file,
          [...QUESTIONNAIRE.CERTIFICATE.FORMATS],
          QUESTIONNAIRE.CERTIFICATE.MAX_SIZE_KB,
        );
      }),
    );

    const questionnaireData = {
      user: foundUser.id,
      skillLevel: skillLevel,
      workout: workout,
      isReadyForCoaching: isReadyForCoaching,
      certificateIds: certificateIds,
      experience: experience,
    };

    const questionnaireEntity =
      QuestionnaireFactory.createEntity(questionnaireData);
    const createdQuestionnaire =
      await this.questionnaireRepository.save(questionnaireEntity);

    this.logger.log(
      `Coach questionnaire created with ID: '${createdQuestionnaire.id}'`,
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

  public async findLatestQuestionnairePublicProfileByUserId(
    userId: string,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(
      `Looking for last questionnaire for public profile with user ID: '${userId}'`,
    );
    return await this.questionnaireRepository.findByUserId(userId);
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

  public async updateVisitorQuestionnaireById(
    userId: string,
    questionnaireId: string,
    dto: UpdateVisitorQuestionnaireDto,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(
      `Updating visitor questionnaire with ID: '${questionnaireId}'`,
    );

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundUser.role !== RoleType.VISITOR) {
      this.logger.warn(
        `User '${userId}' is not visitor. Role: '${foundUser.role}'`,
      );
      throw new BadRequestException(QUESTIONNAIRE_MESSAGES.NO_VISITOR);
    }

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

  public async updateCoachQuestionnaireById(
    userId: string,
    questionnaireId: string,
    dto: UpdateCoachQuestionnaireDto,
    certificateFile: Express.Multer.File,
  ): Promise<QuestionnaireEntity> {
    this.logger.log(
      `Updating coach questionnaire with ID: '${questionnaireId}'`,
    );

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      this.logger.warn(`User with id '${userId}' not found`);
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    if (foundUser.role !== RoleType.COACH) {
      this.logger.warn(
        `User '${userId}' is not coach. Role: '${foundUser.role}'`,
      );
      throw new BadRequestException(QUESTIONNAIRE_MESSAGES.NO_COACH);
    }

    const updatedQuestionnaire =
      await this.findQuestionnaireById(questionnaireId);

    if (userId !== updatedQuestionnaire.user.toString()) {
      this.logger.warn(
        `User ID '${userId}' attempted to questionnaire access owned by User ID '${updatedQuestionnaire.user.toString()}'`,
      );
      throw new ForbiddenException(QUESTIONNAIRE_MESSAGES.NO_ACCESS);
    }

    const certificateId = await this.fileService.uploadFile(
      certificateFile,
      [...QUESTIONNAIRE.CERTIFICATE.FORMATS],
      QUESTIONNAIRE.CERTIFICATE.MAX_SIZE_KB,
    );

    if (dto.skillLevel !== undefined)
      updatedQuestionnaire.skillLevel = dto.skillLevel;
    if (dto.workout !== undefined) updatedQuestionnaire.workout = dto.workout;
    if (dto.workoutDuration !== undefined)
      updatedQuestionnaire.workoutDuration = dto.workoutDuration;
    if (dto.isReadyForCoaching !== undefined)
      updatedQuestionnaire.isReadyForCoaching = dto.isReadyForCoaching;
    if (dto.experience !== undefined)
      updatedQuestionnaire.experience = dto.experience;
    // if (certificateId !== undefined)
    //   updatedQuestionnaire.certificateIds = certificateIds;

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

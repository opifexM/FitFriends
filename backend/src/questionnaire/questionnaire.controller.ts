import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/create-coach-questionnaire.dto';
import { CreateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/create-visitor-questionnaire.dto';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto';
import { UpdateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/update-coach-questionnaire.dto';
import { UpdateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/update-visitor-questionnaire.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { QuestionnaireService } from './questionnaire.service';

@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnaireController {
  private readonly logger = new Logger(QuestionnaireController.name);

  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post('visitor')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new visitor questionnaire' })
  @ApiResponse({
    status: 201,
    description: 'The visitor questionnaire has been successfully created.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createVisitorQuestionnaire(
    @Body() dto: CreateVisitorQuestionnaireDto,
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log('Creating new visitor questionnaire');
    const createdQuestionnaire =
      await this.questionnaireService.createVisitorQuestionnaire(userId, dto);

    return fillDto(QuestionnaireDto, createdQuestionnaire.toPOJO());
  }

  @Post('coach')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('certificateFiles[]'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new coach questionnaire' })
  @ApiResponse({
    status: 201,
    description: 'The coach questionnaire has been successfully created.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createCoachQuestionnaire(
    @Body() dto: CreateCoachQuestionnaireDto,
    @GetUserId() userId: string,
    @UploadedFiles() certificateFiles: Express.Multer.File[],
  ): Promise<QuestionnaireDto> {
    this.logger.log('Creating new coach questionnaire');
    const createdQuestionnaire =
      await this.questionnaireService.createCoachQuestionnaire(
        userId,
        dto,
        certificateFiles,
      );

    return fillDto(QuestionnaireDto, createdQuestionnaire.toPOJO());
  }

  @Get('latest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get last questionnaire by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The last questionnaire has been successfully retrieved.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Last questionnaire not found.' })
  public async getLastQuestionnaire(
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log(`Retrieving last questionnaire with User ID: '${userId}'`);
    const foundQuestionnaire =
      await this.questionnaireService.findLatestQuestionnaireByUserId(userId);

    return fillDto(QuestionnaireDto, foundQuestionnaire.toPOJO());
  }

  @Get(':questionnaireId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get questionnaire by ID' })
  @ApiResponse({
    status: 200,
    description: 'The questionnaire has been successfully retrieved.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found.' })
  public async getQuestionnaire(
    @Param('questionnaireId', MongoIdValidationPipe) questionnaireId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log(`Retrieving questionnaire with ID: '${questionnaireId}'`);
    const foundQuestionnaire =
      await this.questionnaireService.findQuestionnaireById(questionnaireId);

    return fillDto(QuestionnaireDto, foundQuestionnaire.toPOJO());
  }

  @Patch('visitor/:questionnaireId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update visitor questionnaire' })
  @ApiResponse({
    status: 200,
    description: 'The visitor questionnaire has been successfully updated.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found.' })
  public async updateVisitorQuestionnaire(
    @Param('questionnaireId', MongoIdValidationPipe) questionnaireId: string,
    @Body() dto: UpdateVisitorQuestionnaireDto,
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log(
      `Updating visitor questionnaire with ID '${questionnaireId}'`,
    );
    const updatedQuestionnaire =
      await this.questionnaireService.updateVisitorQuestionnaireById(
        userId,
        questionnaireId,
        dto,
      );

    return fillDto(QuestionnaireDto, updatedQuestionnaire.toPOJO());
  }

  @Patch('coach/:questionnaireId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('certificateFile'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update coach questionnaire' })
  @ApiResponse({
    status: 200,
    description: 'The coach questionnaire has been successfully updated.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found.' })
  public async updateCoachQuestionnaire(
    @Param('questionnaireId', MongoIdValidationPipe) questionnaireId: string,
    @Body() dto: UpdateCoachQuestionnaireDto,
    @GetUserId() userId: string,
    @UploadedFile() certificateFile?: Express.Multer.File,
  ): Promise<QuestionnaireDto> {
    this.logger.log(
      `Updating coach questionnaire with ID '${questionnaireId}'`,
    );
    const updatedQuestionnaire =
      await this.questionnaireService.updateCoachQuestionnaireById(
        userId,
        questionnaireId,
        dto,
        certificateFile,
      );

    return fillDto(QuestionnaireDto, updatedQuestionnaire.toPOJO());
  }

  @Delete(':questionnaireId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete questionnaire by ID' })
  @ApiResponse({
    status: 200,
    description: 'The questionnaire has been successfully deleted.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found.' })
  public async deleteQuestionnaire(
    @Param('questionnaireId', MongoIdValidationPipe) questionnaireId: string,
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log(
      `Attempting to delete questionnaire with ID: ${questionnaireId}`,
    );
    const deletedQuestionnaire =
      await this.questionnaireService.deleteQuestionnaireById(
        userId,
        questionnaireId,
      );
    this.logger.log(
      `Questionnaire deleted with ID: '${deletedQuestionnaire.id}'`,
    );

    return fillDto(QuestionnaireDto, deletedQuestionnaire.toPOJO());
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateQuestionnaireDto } from 'shared/type/questionnaire/dto/create-questionnaire.dto';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto';
import { UpdateQuestionnaireDto } from 'shared/type/questionnaire/dto/update-questionnaire.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { QuestionnaireService } from './questionnaire.service';

@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnaireController {
  private readonly logger = new Logger(QuestionnaireController.name);

  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new questionnaire' })
  @ApiResponse({
    status: 201,
    description: 'The questionnaire has been successfully created.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createQuestionnaire(
    @Body() dto: CreateQuestionnaireDto,
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log('Creating new questionnaire');
    const createdQuestionnaire =
      await this.questionnaireService.createQuestionnaire(userId, dto);

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

  @Patch(':questionnaireId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update questionnaire' })
  @ApiResponse({
    status: 200,
    description: 'The questionnaire has been successfully updated.',
    type: QuestionnaireDto,
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found.' })
  public async updateQuestionnaire(
    @Param('questionnaireId', MongoIdValidationPipe) questionnaireId: string,
    @Body() dto: UpdateQuestionnaireDto,
    @GetUserId() userId: string,
  ): Promise<QuestionnaireDto> {
    this.logger.log(`Updating questionnaire with ID '${questionnaireId}'`);
    const updatedQuestionnaire =
      await this.questionnaireService.updateQuestionnaireById(
        userId,
        questionnaireId,
        dto,
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillDto } from 'shared/lib/common';
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto';
import { TrainingPaginationDto } from 'shared/type/training/dto/training-pagination.dto';
import { TrainingDto } from 'shared/type/training/dto/training.dto';
import { UpdateTrainingDto } from 'shared/type/training/dto/update-training.dto';
import { TrainingQuery } from 'shared/type/training/training.query';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { JwtAuthGuard } from '../user/authentication/guard/jwt-auth.guard';
import { TrainingService } from './training.service';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  private readonly logger = new Logger(TrainingController.name);

  constructor(private readonly trainingService: TrainingService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new training' })
  @ApiResponse({
    status: 201,
    description: 'The training has been successfully created.',
    type: TrainingDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createTraining(
    @Body() dto: CreateTrainingDto,
    @GetUserId() userId: string,
  ): Promise<TrainingDto> {
    this.logger.log(`Creating new training with User ID: '${userId}'`);
    const createdTraining = await this.trainingService.createTraining(
      userId,
      dto,
    );

    return fillDto(TrainingDto, createdTraining.toPOJO());
  }

  @Get(':trainingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get training by ID' })
  @ApiResponse({
    status: 200,
    description: 'The training has been successfully retrieved.',
    type: TrainingDto,
  })
  @ApiResponse({ status: 404, description: 'Training not found.' })
  public async getTraining(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
  ): Promise<TrainingDto> {
    this.logger.log(`Retrieving training with ID: '${trainingId}'`);
    const foundTraining =
      await this.trainingService.findTrainingById(trainingId);

    return fillDto(TrainingDto, foundTraining.toPOJO());
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get training list' })
  @ApiResponse({
    status: 200,
    description: 'The training list has been successfully retrieved.',
    type: TrainingPaginationDto,
  })
  @ApiResponse({ status: 404, description: 'Products not found.' })
  public async getAllTraining(
    @Query() query: TrainingQuery,
  ): Promise<TrainingPaginationDto> {
    this.logger.log(
      `Retrieving training list with query: ${JSON.stringify(query)}'`,
    );
    const trainingPaginationData =
      await this.trainingService.findTrainingByQuery(query);

    return fillDto(TrainingPaginationDto, {
      ...trainingPaginationData,
      entities: trainingPaginationData.entities.map((product) =>
        product.toPOJO(),
      ),
    });
  }

  @Patch(':trainingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update training' })
  @ApiResponse({
    status: 200,
    description: 'The training has been successfully updated.',
    type: TrainingDto,
  })
  @ApiResponse({ status: 404, description: 'Training not found.' })
  public async updateTraining(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @Body() dto: UpdateTrainingDto,
    @GetUserId() userId: string,
  ): Promise<TrainingDto> {
    this.logger.log(`Updating training with ID '${trainingId}'`);
    const updatedTraining = await this.trainingService.updateTrainingById(
      userId,
      trainingId,
      dto,
    );

    return fillDto(TrainingDto, updatedTraining.toPOJO());
  }

  @Delete(':trainingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete training by ID' })
  @ApiResponse({
    status: 200,
    description: 'The training has been successfully deleted.',
    type: TrainingDto,
  })
  @ApiResponse({ status: 404, description: 'Training not found.' })
  public async deleteTraining(
    @Param('trainingId', MongoIdValidationPipe) trainingId: string,
    @GetUserId() userId: string,
  ): Promise<TrainingDto> {
    this.logger.log(`Attempting to delete training with ID: ${trainingId}`);
    const deletedTraining = await this.trainingService.deleteTrainingById(
      userId,
      trainingId,
    );
    this.logger.log(`Training deleted with ID: '${deletedTraining.id}'`);

    return fillDto(TrainingDto, deletedTraining.toPOJO());
  }
}

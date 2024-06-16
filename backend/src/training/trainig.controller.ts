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
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto';
import { TrainingDto } from 'shared/type/training/dto/training.dto';
import { UpdateTrainingDto } from 'shared/type/training/dto/update-training.dto';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
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
  ): Promise<TrainingDto> {
    this.logger.log('Creating new training');
    const createdTraining = await this.trainingService.createTraining(dto);

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
  ): Promise<TrainingDto> {
    this.logger.log(`Updating training with ID '${trainingId}'`);
    const updatedTraining = await this.trainingService.updateTrainingById(
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
  ): Promise<TrainingDto> {
    this.logger.log(`Attempting to delete training with ID: ${trainingId}`);
    const deletedTraining =
      await this.trainingService.deleteTrainingById(trainingId);
    this.logger.log(`Training deleted with ID: '${deletedTraining.id}'`);

    return fillDto(TrainingDto, deletedTraining.toPOJO());
  }
}

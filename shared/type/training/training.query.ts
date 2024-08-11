import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { WorkoutType } from '../enum/workout-type.enum';
import { TrainingSortType } from './training-sort-type.enum';

export class TrainingQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number of the training pagination',
    example: 1,
  })
  public currentPage?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit the number of training returned',
    example: 10,
  })
  public limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Minimum price of the training',
    example: 10,
  })
  public priceFrom?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Maximum price of the training',
    example: 100,
  })
  public priceTo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Minimum calories burned during the training',
    example: 100,
  })
  public caloriesFrom?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Maximum calories burned during the training',
    example: 1000,
  })
  public caloriesTo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: 'Minimum number of rating',
  })
  public ratingFrom?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({
    example: 3,
    description: 'Maximum number of rating',
  })
  public ratingTo?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(WorkoutType, { each: true })
  @ApiProperty({
    example: [WorkoutType.AEROBICS, WorkoutType.CROSSFIT],
    description: 'The types of workouts',
    enum: WorkoutType,
    isArray: true,
  })
  public workout?: WorkoutType[];

  @IsOptional()
  @IsEnum(TrainingSortType)
  @ApiPropertyOptional({
    description: 'Type of sorting to be applied to the training list',
    enum: TrainingSortType,
    example: TrainingSortType.BY_HIGH_PRICE,
  })
  public trainingSortType?: TrainingSortType;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Coach ID for training filtration',
  })
  public coachId?: string;
}

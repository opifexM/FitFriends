import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import { GenderType } from '../../enum/gender-type.enum';
import { SkillLevelType } from '../../enum/skill-level-type.enum';
import { WorkoutDurationType } from '../../enum/workout-duration-type.enum';
import { WorkoutType } from '../../enum/workout-type.enum';
import { TRAINING } from '../traning.constant';

export class UpdateTrainingDto {
  @IsOptional()
  @IsString()
  @Length(TRAINING.NAME.MIN, TRAINING.NAME.MAX)
  @ApiProperty({
    example: 'Morning Yoga',
    description: 'The name of the training',
    minLength: TRAINING.NAME.MIN,
    maxLength: TRAINING.NAME.MAX,
  })
  public name?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'The background ID for the training',
  })
  public backgroundId?: string;

  @IsOptional()
  @IsEnum(SkillLevelType)
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level required for the training',
  })
  public skillLevel?: SkillLevelType;

  @IsOptional()
  @IsEnum(WorkoutType)
  @ApiProperty({
    example: WorkoutType.AEROBICS,
    description: 'The type of workout',
  })
  public workout?: WorkoutType;

  @IsOptional()
  @IsEnum(WorkoutDurationType)
  @ApiProperty({
    example: WorkoutDurationType.MINUTES_10_30,
    description: 'The duration of the workout',
  })
  public workoutDuration?: WorkoutDurationType;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 20,
    description: 'The price of the training',
  })
  public price?: number;

  @IsOptional()
  @IsNumber()
  @Min(TRAINING.CALORIES.MIN)
  @Max(TRAINING.CALORIES.MAX)
  @ApiProperty({
    example: 1500,
    description: 'The number of calories burned during the training',
    minimum: TRAINING.CALORIES.MIN,
    maximum: TRAINING.CALORIES.MAX,
  })
  public caloriesBurned?: number;

  @IsOptional()
  @IsString()
  @Length(TRAINING.DESCRIPTION.MIN, TRAINING.DESCRIPTION.MAX)
  @ApiProperty({
    example:
      'A high-intensity interval training session to burn maximum calories.',
    description: 'The description of the training',
    minLength: TRAINING.DESCRIPTION.MIN,
    maxLength: TRAINING.DESCRIPTION.MAX,
  })
  public description?: string;

  @IsOptional()
  @IsEnum(GenderType)
  @ApiProperty({
    example: GenderType.MALE,
    description: 'The gender for which the training is suitable',
  })
  public gender?: GenderType;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'The video ID associated with the training',
  })
  public videoId?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Indicates if the training is a special offer',
  })
  public isSpecialOffer?: boolean;
}

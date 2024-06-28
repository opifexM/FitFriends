import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant';

export class CreateQuestionnaireDto {
  @IsEnum(SkillLevelType)
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level of the user',
    enum: SkillLevelType,
  })
  public skillLevel: SkillLevelType;

  @IsArray()
  @ArrayMaxSize(QUESTIONNAIRE.WORKOUT.MAX)
  @IsEnum(WorkoutType, { each: true })
  @ApiProperty({
    example: [WorkoutType.AEROBICS, WorkoutType.CROSSFIT],
    description: 'The types of workouts',
    enum: WorkoutType,
    isArray: true,
    maxItems: QUESTIONNAIRE.WORKOUT.MAX,
  })
  public workout: WorkoutType[];

  @IsEnum(WorkoutDurationType)
  @ApiProperty({
    example: WorkoutDurationType.MINUTES_30_50,
    description: 'The duration of the workout',
    enum: WorkoutDurationType,
  })
  public workoutDuration: WorkoutDurationType;

  @IsNumber()
  @Min(QUESTIONNAIRE.CALORIES_TO_LOSE.MIN)
  @Max(QUESTIONNAIRE.CALORIES_TO_LOSE.MAX)
  @ApiProperty({
    example: 500,
    description: 'The number of calories to lose',
    minimum: QUESTIONNAIRE.CALORIES_TO_LOSE.MIN,
    maximum: QUESTIONNAIRE.CALORIES_TO_LOSE.MAX,
  })
  public caloriesToLose: number;

  @IsNumber()
  @Min(QUESTIONNAIRE.DAILY_CALORIE_BURN.MIN)
  @Max(QUESTIONNAIRE.DAILY_CALORIE_BURN.MAX)
  @ApiProperty({
    example: 2000,
    description: 'The daily calorie burn',
    minimum: QUESTIONNAIRE.DAILY_CALORIE_BURN.MIN,
    maximum: QUESTIONNAIRE.DAILY_CALORIE_BURN.MAX,
  })
  public dailyCalorieBurn: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is the user ready for training',
  })
  public isReadyForTraining?: boolean;
}

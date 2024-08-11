import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant';

export class UpdateCoachQuestionnaireDto {
  @IsOptional()
  @IsEnum(SkillLevelType)
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level of the user',
    enum: SkillLevelType,
  })
  public skillLevel?: SkillLevelType;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(QUESTIONNAIRE.WORKOUT.MAX)
  @IsEnum(WorkoutType, { each: true })
  @ApiProperty({
    example: [WorkoutType.AEROBICS, WorkoutType.BOXING],
    description: 'The types of workouts',
    enum: WorkoutType,
    isArray: true,
    maxItems: QUESTIONNAIRE.WORKOUT.MAX,
  })
  public workout?: WorkoutType[];

  @IsOptional()
  @IsEnum(WorkoutDurationType)
  @ApiProperty({
    example: WorkoutDurationType.MINUTES_30_50,
    description: 'The duration of the workout',
    enum: WorkoutDurationType,
  })
  public workoutDuration?: WorkoutDurationType;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Certificate file for the coach',
  })
  public certificateFiles?: any[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    example: true,
    description: 'Is the coach ready for coaching',
  })
  public isReadyForCoaching?: boolean;

  @IsOptional()
  @IsString()
  @Length(QUESTIONNAIRE.EXPERIENCE.MIN, QUESTIONNAIRE.EXPERIENCE.MAX)
  @ApiProperty({
    example: 'Worked as a coach for 5 years',
    description: 'Experience description for the coach',
    minLength: QUESTIONNAIRE.EXPERIENCE.MIN,
    maxLength: QUESTIONNAIRE.EXPERIENCE.MAX,
  })
  public experience?: string;
}

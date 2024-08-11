import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant';

export class CreateCoachQuestionnaireDto {
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

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Certificate file for the coach',
    isArray: true,
  })
  public certificateFiles?: any[];

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    example: true,
    description: 'Is the coach ready for coaching',
  })
  public isReadyForCoaching: boolean;

  @IsString()
  @Length(QUESTIONNAIRE.EXPERIENCE.MIN, QUESTIONNAIRE.EXPERIENCE.MAX)
  @ApiProperty({
    example: 'Worked as a coach for 5 years',
    description: 'Experience description for the coach',
    minLength: QUESTIONNAIRE.EXPERIENCE.MIN,
    maxLength: QUESTIONNAIRE.EXPERIENCE.MAX,
  })
  public experience: string;
}

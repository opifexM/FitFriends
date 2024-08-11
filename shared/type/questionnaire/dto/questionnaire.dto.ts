import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';

export class QuestionnaireDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the questionnaire',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public user: string;

  @Expose()
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level of the user',
    enum: SkillLevelType,
  })
  public skillLevel: SkillLevelType;

  @Expose()
  @ApiProperty({
    example: [WorkoutType.CROSSFIT, WorkoutType.AEROBICS],
    description: 'The types of workouts',
    enum: WorkoutType,
  })
  public workout: WorkoutType[];

  @Expose()
  @ApiProperty({
    example: WorkoutDurationType.MINUTES_10_30,
    description: 'The duration of the workout',
    enum: WorkoutDurationType,
  })
  public workoutDuration: WorkoutDurationType;

  @Expose()
  @ApiProperty({
    example: 500,
    description: 'The number of calories to lose',
  })
  public caloriesToLose: number;

  @Expose()
  @ApiProperty({
    example: 2000,
    description: 'The daily calorie burn',
  })
  public dailyCalorieBurn: number;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Is the visitor ready for training',
  })
  public isReadyForTraining: boolean;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Is the coach ready for coaching',
  })
  public isReadyForCoaching: boolean;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the certificate file',
  })
  public certificateIds: string[];

  @Expose()
  @ApiProperty({
    example: 'Worked as a coach for 5 years',
    description: 'Experience description for the coach',
  })
  public experience: string;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the questionnaire was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the questionnaire was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

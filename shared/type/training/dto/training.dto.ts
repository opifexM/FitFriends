import {ApiProperty} from '@nestjs/swagger';
import {Expose} from "class-transformer";
import {GenderType} from "../../enum/gender-type.enum";
import {SkillLevelType} from "../../enum/skill-level-type.enum";
import {WorkoutDurationType} from "../../enum/workout-duration-type.enum";
import {WorkoutType} from "../../enum/workout-type.enum";

export class TrainingDto {
  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique ID of the training',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: 'Morning Yoga',
    description: 'The name of the training',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'The background ID for the training',
  })
  public backgroundId: string;

  @Expose()
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level required for the training',
  })
  public skillLevel: SkillLevelType;

  @Expose()
  @ApiProperty({
    example: WorkoutType.AEROBICS,
    description: 'The type of workout',
  })
  public workout: WorkoutType;

  @Expose()
  @ApiProperty({
    example: WorkoutDurationType.MINUTES_10_30,
    description: 'The duration of the workout',
  })
  public workoutDuration: WorkoutDurationType;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the training',
  })
  public price: number;

  @Expose()
  @ApiProperty({
    example: 1500,
    description: 'The number of calories burned during the training',
  })
  public caloriesBurned: number;

  @Expose()
  @ApiProperty({
    example: 'A high-intensity interval training session to burn maximum calories.',
    description: 'The description of the training',
  })
  public description: string;

  @Expose()
  @ApiProperty({
    example: GenderType.MALE,
    description: 'The gender for which the training is suitable',
  })
  public gender: GenderType;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'The video ID associated with the training',
  })
  public videoId: string;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public coach: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indicates if the training is a special offer',
  })
  public isSpecialOffer: boolean;


  @Expose()
  @ApiProperty({
    description: 'The date and time when the training was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the traning was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

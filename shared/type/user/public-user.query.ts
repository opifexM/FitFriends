import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { LocationType } from '../enum/location-type.enum';
import { SkillLevelType } from '../enum/skill-level-type.enum';
import { WorkoutType } from '../enum/workout-type.enum';
import { PublicUserSortType } from './public-user-sort-type.enum';

export class PublicUserQuery {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number of the public user pagination',
    example: 1,
  })
  public currentPage?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Limit the number of public user returned',
    example: 10,
  })
  public limit?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(LocationType, { each: true })
  @ApiProperty({
    example: [LocationType.PETROGRADSKAYA, LocationType.PIONERSKAYA],
    description: 'The types of locations',
    enum: LocationType,
    isArray: true,
  })
  public location?: LocationType[];

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
  @IsEnum(SkillLevelType)
  @ApiProperty({
    example: SkillLevelType.BEGINNER,
    description: 'The skill level of the user',
    enum: SkillLevelType,
  })
  public skillLevel: SkillLevelType;

  @IsOptional()
  @IsEnum(PublicUserSortType)
  @ApiPropertyOptional({
    description: 'Type of sorting to be applied to the user list',
    enum: PublicUserSortType,
    example: PublicUserSortType.BY_COACH,
  })
  public publicUserSortType?: PublicUserSortType;
}

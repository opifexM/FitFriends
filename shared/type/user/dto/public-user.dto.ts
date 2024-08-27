import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { LocationType } from '../../enum/location-type.enum';
import { RoleType } from '../../enum/role-type.enum';
import { WorkoutType } from '../../enum/workout-type.enum';

export class PublicUserDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    example: 'I love running and doing physical exercises',
    description: 'The description for the user account',
  })
  public description: string;

  @Expose()
  @ApiProperty({
    example: LocationType.PIONERSKAYA,
    description: 'The location of the user',
    enum: LocationType,
  })
  public location: LocationType;

  @Expose()
  @ApiProperty({
    example: RoleType.VISITOR,
    description: 'The role of the user',
    enum: RoleType,
  })
  public role: RoleType;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The profile picture ID of the user',
  })
  public profilePictureId: string;

  @Expose()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The avatar ID of the user',
  })
  public avatarId: string;

  @Expose()
  @ApiProperty({
    example: [WorkoutType.CROSSFIT, WorkoutType.AEROBICS],
    description: 'The types of workouts',
    enum: WorkoutType,
  })
  public workout: WorkoutType[];

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
    example: 'Worked as a coach for 5 years',
    description: 'Experience description for the coach',
  })
  public experience: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indicates if current user is subscribed to coach',
  })
  public isSubscribed: boolean;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the certificate file',
  })
  public certificateIds: string[];
}

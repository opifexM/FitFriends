import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {GenderType} from "../../enum/gender-type.enum";
import {LocationType} from "../../enum/location-type.enum";
import {RoleType} from "../../enum/role-type.enum";

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    example: 'I love running and doing physical exercises',
    description: 'The description for the user account.',
  })
  public description: string;

  @Expose()
  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  public dateOfBirth: Date;

  @Expose()
  @ApiProperty({
    example: LocationType.PIONERSKAYA,
    description: 'The location of the user',
    enum: LocationType
  })
  public location: LocationType;

  @Expose()
  @ApiProperty({
    example: GenderType.FEMALE,
    description: 'The gender of the user',
    enum: GenderType
  })
  public gender: GenderType;

  @Expose()
  @ApiProperty({
    example: RoleType.VISITOR,
    description: 'The role of the user',
    enum: RoleType
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
    description: 'The date and time when the user was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the user was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

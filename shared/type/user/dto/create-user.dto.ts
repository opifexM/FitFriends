import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, Length, IsDate, IsEnum, IsUUID, IsOptional} from 'class-validator';
import {USER} from '../user.constant';
import {GenderType} from "../../enum/gender-type.enum";
import {LocationType} from "../../enum/location-type.enum";
import {RoleType} from "../../enum/role-type.enum";
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email: string;

  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER.NAME.MIN,
    maxLength: USER.NAME.MAX,
  })
  public name: string;

  @IsString()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  @ApiProperty({
    example: 'YourSecurePassword123!',
    description: 'The password for the user account.',
    minLength: USER.PASSWORD.MIN,
    maxLength: USER.PASSWORD.MAX,
  })
  public password: string;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  public dateOfBirth: Date;

  @IsEnum(LocationType)
  @ApiProperty({
    example: LocationType.PIONERSKAYA,
    description: 'The location of the user',
  })
  public location: LocationType;

  @IsEnum(GenderType)
  @ApiProperty({
    example: GenderType.FEMALE,
    description: 'The gender of the user',
  })
  public gender: GenderType;

  @IsEnum(RoleType)
  @ApiProperty({
    example: RoleType.VISITOR,
    description: 'The role of the user',
  })
  public role: RoleType;

  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The profile picture ID of the user',
  })
  public profilePictureId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The avatar picture ID of the user',
  })
  public avatarId?: string;

  @IsOptional()
  @IsString()
  @Length(USER.DESCRIPTION.MIN, USER.DESCRIPTION.MAX)
  @ApiProperty({
    example: 'A dedicated and motivated fitness enthusiast who is disciplined, active, health-conscious, energetic, goal-oriented, resilient, and passionate',
    description: 'The description of the user',
    minLength: USER.DESCRIPTION.MIN,
    maxLength: USER.DESCRIPTION.MAX,
  })
  public description?: string;
}

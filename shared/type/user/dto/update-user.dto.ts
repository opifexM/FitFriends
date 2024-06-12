import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { LocationType } from 'shared/type/enum/location-type.enum';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { USER } from '../user.constant';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER.NAME.MIN,
    maxLength: USER.NAME.MAX,
  })
  public name?: string;

  @IsOptional()
  @IsString()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
    minLength: USER.PASSWORD.MIN,
    maxLength: USER.PASSWORD.MAX,
  })
  public password?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  public dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(LocationType)
  @ApiProperty({
    example: LocationType.PIONERSKAYA,
    description: 'The location of the user',
  })
  public location?: LocationType;

  @IsOptional()
  @IsEnum(GenderType)
  @ApiProperty({
    example: GenderType.FEMALE,
    description: 'The gender of the user',
  })
  public gender?: GenderType;

  @IsOptional()
  @IsEnum(RoleType)
  @ApiProperty({
    example: RoleType.VISITOR,
    description: 'The role of the user',
  })
  public role?: RoleType;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The profile picture ID of the user',
  })
  public profilePictureId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The avatar ID of the user',
  })
  public avatarId?: string;
}

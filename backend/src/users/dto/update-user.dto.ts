import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { USER } from '../entity/user.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER.NAME.MIN,
    maxLength: USER.NAME.MAX,
  })
  @IsOptional()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  public name?: string;

  @ApiPropertyOptional({
    example: 30,
    description: 'The age of the user',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  public age?: number;
}

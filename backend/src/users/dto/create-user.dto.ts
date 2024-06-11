import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { USER } from '../entity/user.constant';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsNumber()
  @ApiProperty({ example: 30, description: 'The age of the user', minimum: 0 })
  public age: number;
}

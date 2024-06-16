import {ApiProperty} from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'The email address of the user trying to log in.',
    example: 'user@example.com',
  })
  public email: string;

  @IsString()
  @ApiProperty({
    description: 'The password for the user account.',
    example: 'UserPassword123!',
  })
  public password: string;
}

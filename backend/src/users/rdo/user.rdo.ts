import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @Expose()
  public email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Expose()
  public name: string;

  @ApiProperty({ example: 30, description: 'The age of the user' })
  @Expose()
  public age: number;
}

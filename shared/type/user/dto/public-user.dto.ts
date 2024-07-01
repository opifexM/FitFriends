import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
}

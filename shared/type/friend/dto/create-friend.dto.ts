import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateFriendDto {
  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user being added as a friend',
  })
  public friend: string;
}

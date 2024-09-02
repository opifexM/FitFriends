import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RequestStatusType } from '../../enum/request-status-type.enum';
import { PublicUserDto } from '../../user/dto/public-user.dto';

export class FriendDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the friend connection',
  })
  public id: string;

  @Expose()
  @Type(() => PublicUserDto)
  @ApiProperty({
    description: 'The user who initiated the friend request',
  })
  public friendInitiator: PublicUserDto;

  @Expose()
  @ApiProperty({
    description: 'The user ID who initiated the training request',
  })
  public requestInitiator: string;

  @Expose()
  @Type(() => PublicUserDto)
  @ApiProperty({
    description: 'The user who being added as a friend',
  })
  public friend: PublicUserDto;

  @Expose()
  @ApiProperty({
    example: RequestStatusType.ACCEPTED,
    description: 'The current status of share training request',
    enum: RequestStatusType,
  })
  public requestStatus: RequestStatusType;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the friend request was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the friend request was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

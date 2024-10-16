import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotifyDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the notification',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  public user: string;

  @Expose()
  @ApiProperty({
    example: 'Friend connection',
    description: 'The topic or subject of the notification',
  })
  public text: string;

  @Expose()
  @ApiProperty({
    example: 'Your friend request has been accepted.',
    description: 'The content or message of the notification',
  })
  public topic: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indicates if the notification has been read',
  })
  public isRead: boolean;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the notification was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the notification was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

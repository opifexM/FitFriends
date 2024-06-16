import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BalanceDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the balance',
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
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the training',
  })
  public training: string;

  @Expose()
  @ApiProperty({
    example: 5,
    description: 'The number of available training',
  })
  public count: number;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the balance was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the balance was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

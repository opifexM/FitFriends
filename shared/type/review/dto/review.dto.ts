import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewDto {
  @Expose()
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the review',
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
    example: 3,
    description: 'The number of rating',
  })
  public rating: number;

  @Expose()
  @ApiProperty({
    example:
      'The training session was incredibly informative and engaging. The coach demonstrated deep knowledge and provided practical insights. The interactive activities helped reinforce the concepts, making it easier to apply them in real-world scenarios. Overall, it was a highly valuable experience.',
    description: 'The text of the review',
  })
  public text: string;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the review was created.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The date and time when the review was updated.',
    type: 'string',
    format: 'date-time',
    example: '2021-01-01T12:00:00Z',
  })
  public updatedAt: Date;
}

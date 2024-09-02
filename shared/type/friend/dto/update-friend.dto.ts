import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RequestStatusType } from '../../enum/request-status-type.enum';

export class UpdateFriendDto {
  @IsEnum(RequestStatusType)
  @ApiProperty({
    example: RequestStatusType.REJECTED,
    description: 'The current status of share training request',
    enum: RequestStatusType,
  })
  public requestStatus: RequestStatusType;
}

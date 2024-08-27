import { ApiProperty } from '@nestjs/swagger';

export class UploadCoachFileQuestionnaireDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Certificate file for the coach',
  })
  public certificateFile: any;
}

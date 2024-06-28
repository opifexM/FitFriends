import { Logger } from '@nestjs/common';
import { QuestionnaireEntity } from './questionnaire.entity';

export class QuestionnaireFactory {
  private static readonly logger = new Logger(QuestionnaireFactory.name);

  public static createEntity(plainObject: any): QuestionnaireEntity {
    return new QuestionnaireEntity(plainObject);
  }
}

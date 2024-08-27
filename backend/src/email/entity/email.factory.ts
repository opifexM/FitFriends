import { Logger } from '@nestjs/common';
import { EmailEntity } from './email.entity';

export class EmailFactory {
  private static readonly logger = new Logger(EmailFactory.name);

  public static createEntity(plainObject: any): EmailEntity {
    return new EmailEntity(plainObject);
  }
}

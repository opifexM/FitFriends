import { Logger } from '@nestjs/common';
import { NotifyEntity } from './notify.entity';

export class NotifyFactory {
  private static readonly logger = new Logger(NotifyFactory.name);

  public static createEntity(plainObject: any): NotifyEntity {
    return new NotifyEntity(plainObject);
  }
}

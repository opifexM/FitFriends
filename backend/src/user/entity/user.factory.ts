import { Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';

export class UserFactory {
  private static readonly logger = new Logger(UserFactory.name);

  public static createEntity(plainObject: any): UserEntity {
    return new UserEntity(plainObject);
  }
}

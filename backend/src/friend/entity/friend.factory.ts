import { Logger } from '@nestjs/common';
import { FriendEntity } from './friend.entity';

export class FriendFactory {
  private static readonly logger = new Logger(FriendFactory.name);

  public static createEntity(plainObject: any): FriendEntity {
    return new FriendEntity(plainObject);
  }
}

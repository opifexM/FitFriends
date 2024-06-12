import { UserEntity } from '../entity/user.entity';

export interface RequestWithUser {
  user?: UserEntity;
}

import { TokenPayload } from 'shared/type/token-payload.interface';
import { UserEntity } from '../entity/user.entity';

export function createJWTPayload(user: UserEntity): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}

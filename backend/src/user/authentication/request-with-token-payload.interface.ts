import { TokenPayload } from 'shared/type/token-payload.interface';

export interface RequestWithTokenPayload {
  user?: TokenPayload;
}

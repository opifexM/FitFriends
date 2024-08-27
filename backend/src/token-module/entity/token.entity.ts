import { instanceToPlain } from 'class-transformer';
import { Entity } from 'shared/base/entity';
import { JwtToken } from 'shared/type/jwt-token.interface';

export class TokenEntity extends Entity {
  public tokenId: string;
  public createdAt: Date;
  public userId: string;
  public expiresIn: Date;

  constructor(token?: JwtToken) {
    super();
    this.fillTokenData(token);
  }

  public fillTokenData(token?: JwtToken): void {
    if (!token) {
      return;
    }

    Object.assign(this, token);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

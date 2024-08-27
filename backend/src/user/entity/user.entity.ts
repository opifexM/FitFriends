import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { LocationType } from 'shared/type/enum/location-type.enum';
import { RoleType } from 'shared/type/enum/role-type.enum';
import { User } from 'shared/type/user/user';

export class UserEntity extends Entity implements User {
  public avatarId: string;
  public createdAt: Date;
  public dateOfBirth: Date;
  public description: string;
  public email: string;
  public gender: GenderType;
  public location: LocationType;
  public name: string;
  public password: string;
  public profilePictureId: string;
  public updatedAt: Date;
  public role: RoleType;
  public subscriptions: Types.ObjectId[];

  constructor(user?: User) {
    super();
    this.fillUserData(user);
  }

  public fillUserData(user?: User): void {
    if (!user) {
      return;
    }

    Object.assign(this, user);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

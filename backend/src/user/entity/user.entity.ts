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

  constructor(user?: User) {
    super();
    this.fillUserData(user);
  }

  public fillUserData(user?: User): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.avatarId = user.avatarId;
    this.createdAt = user.createdAt;
    this.dateOfBirth = user.dateOfBirth;
    this.description = user.description;
    this.email = user.email;
    this.gender = user.gender;
    this.location = user.location;
    this.name = user.name;
    this.password = user.password;
    this.profilePictureId = user.profilePictureId;
    this.updatedAt = user.updatedAt;
    this.role = user.role;
  }

  public toPOJO() {
    return {
      id: this.id,
      avatarId: this.avatarId,
      createdAt: this.createdAt,
      dateOfBirth: this.dateOfBirth,
      description: this.description,
      email: this.email,
      gender: this.gender,
      location: this.location,
      name: this.name,
      password: this.password,
      profilePictureId: this.profilePictureId,
      updatedAt: this.updatedAt,
      role: this.role,
    };
  }
}

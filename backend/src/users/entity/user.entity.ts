import { Entity } from 'shared/base/entity';
import { User } from 'shared/type/user';

export class UserEntity extends Entity implements User {
  name: string;
  email: string;
  age: number;

  constructor(user?: User) {
    super();
    this.fillUserData(user);
  }

  public fillUserData(user?: User): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.age = user.age ?? 0;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      age: this.age,
    };
  }
}

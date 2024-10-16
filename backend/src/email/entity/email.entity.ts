import { instanceToPlain } from 'class-transformer';
import { Entity } from 'shared/base/entity';
import { Email } from 'shared/type/email/email';

export class EmailEntity extends Entity implements Email {
  public emailFrom: string;
  public emailTo: string;
  public topic: string;
  public text: string;
  public date: Date;

  constructor(email?: Email) {
    super();
    this.fillUserData(email);
  }

  public fillUserData(email?: Email): void {
    if (!email) {
      return;
    }

    Object.assign(this, email);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

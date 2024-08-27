import { instanceToPlain } from 'class-transformer';
import { Entity } from 'shared/base/entity';
import { Email } from 'shared/type/email/email';
import { Questionnaire } from 'shared/type/questionnaire/questionnaire';

export class EmailEntity extends Entity implements Email {
  public emailFrom: string;
  public emailTo: string;
  public topic: string;
  public text: string;

  constructor(questionnaire?: Questionnaire) {
    super();
    this.fillUserData(questionnaire);
  }

  public fillUserData(questionnaire?: Questionnaire): void {
    if (!questionnaire) {
      return;
    }

    Object.assign(this, questionnaire);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

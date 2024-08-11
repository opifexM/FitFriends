import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { Questionnaire } from 'shared/type/questionnaire/questionnaire';

export class QuestionnaireEntity extends Entity implements Questionnaire {
  public caloriesToLose: number;
  public createdAt: Date;
  public dailyCalorieBurn: number;
  public isReadyForTraining: boolean;
  public skillLevel: SkillLevelType;
  public updatedAt: Date;
  public user: Types.ObjectId;
  public workout: WorkoutType[];
  public workoutDuration: WorkoutDurationType;
  public experience: string;
  public certificateIds: string[];
  public isReadyForCoaching: boolean;

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

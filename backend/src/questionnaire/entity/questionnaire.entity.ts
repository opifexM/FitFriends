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

  constructor(questionnaire?: Questionnaire) {
    super();
    this.fillUserData(questionnaire);
  }

  public fillUserData(questionnaire?: Questionnaire): void {
    if (!questionnaire) {
      return;
    }

    this.id = questionnaire.id ?? '';
    this.caloriesToLose = questionnaire.caloriesToLose;
    this.createdAt = questionnaire.createdAt;
    this.dailyCalorieBurn = questionnaire.dailyCalorieBurn;
    this.isReadyForTraining = questionnaire.isReadyForTraining;
    this.skillLevel = questionnaire.skillLevel;
    this.updatedAt = questionnaire.updatedAt;
    this.user = questionnaire.user;
    this.workout = questionnaire.workout;
    this.workoutDuration = questionnaire.workoutDuration;
  }

  public toPOJO() {
    return {
      id: this.id,
      caloriesToLose: this.caloriesToLose,
      createdAt: this.createdAt,
      dailyCalorieBurn: this.dailyCalorieBurn,
      isReadyForTraining: this.isReadyForTraining,
      skillLevel: this.skillLevel,
      updatedAt: this.updatedAt,
      user: this.user,
      workout: this.workout,
      workoutDuration: this.workoutDuration,
    };
  }
}

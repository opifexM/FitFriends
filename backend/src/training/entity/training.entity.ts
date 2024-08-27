import { instanceToPlain } from 'class-transformer';
import { Types } from 'mongoose';
import { Entity } from 'shared/base/entity';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { Training } from 'shared/type/training/training';

export class TrainingEntity extends Entity implements Training {
  public backgroundId: string;
  public caloriesBurned: number;
  public coach: Types.ObjectId;
  public createdAt: Date;
  public description: string;
  public gender: GenderType;
  public isSpecialOffer: boolean;
  public name: string;
  public price: number;
  public rating: number;
  public skillLevel: SkillLevelType;
  public updatedAt: Date;
  public videoId: string;
  public workout: WorkoutType;
  public workoutDuration: WorkoutDurationType;
  public discountPercent: number;

  constructor(training?: Training) {
    super();
    this.fillUserData(training);
  }

  public fillUserData(training?: Training): void {
    if (!training) {
      return;
    }

    Object.assign(this, training);
  }

  public toPOJO() {
    const { _id, ...rest } = instanceToPlain(this);
    return {
      ...rest,
      id: this.id,
    };
  }
}

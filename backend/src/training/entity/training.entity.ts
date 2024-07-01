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

    this.id = training.id ?? '';
    this.backgroundId = training.backgroundId;
    this.caloriesBurned = training.caloriesBurned;
    this.coach = training.coach;
    this.createdAt = training.createdAt;
    this.description = training.description;
    this.gender = training.gender;
    this.isSpecialOffer = training.isSpecialOffer;
    this.discountPercent = training.discountPercent;
    this.name = training.name;
    this.price = training.price;
    this.rating = training.rating;
    this.skillLevel = training.skillLevel;
    this.updatedAt = training.updatedAt;
    this.videoId = training.videoId;
    this.workout = training.workout;
    this.workoutDuration = training.workoutDuration;
  }

  public toPOJO() {
    return {
      id: this.id,
      backgroundId: this.backgroundId,
      caloriesBurned: this.caloriesBurned,
      coach: this.coach,
      createdAt: this.createdAt,
      description: this.description,
      gender: this.gender,
      isSpecialOffer: this.isSpecialOffer,
      discountPercent: this.discountPercent,
      name: this.name,
      price: this.price,
      rating: this.rating,
      skillLevel: this.skillLevel,
      updatedAt: this.updatedAt,
      videoId: this.videoId,
      workout: this.workout,
      workoutDuration: this.workoutDuration,
    };
  }
}

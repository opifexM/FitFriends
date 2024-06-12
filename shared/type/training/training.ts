import {GenderType} from "../enum/gender-type.enum";
import {SkillLevelType} from "../enum/skill-level-type.enum";
import {WorkoutDurationType} from "../enum/workout-duration-type.enum";
import {WorkoutType} from "../enum/workout-type.enum";
import {User} from "../user/user";

export interface Training {
  id?: string;
  name: string;
  backgroundId: string;
  skillLevel: SkillLevelType;
  workout: WorkoutType;
  workoutDuration: WorkoutDurationType;
  price: number;
  caloriesBurned: number;
  description: string;
  gender: GenderType;
  videoId: string;
  rating: number;
  coach: User;
  isSpecialOffer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

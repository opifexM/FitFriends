import {SkillLevelType} from "../enum/skill-level-type.enum";
import {WorkoutDurationType} from "../enum/workout-duration-type.enum";
import {WorkoutType} from "../enum/workout-type.enum";
import {User} from "../user/user";

export interface Questionnaire {
  id?: string;
  user: User;
  skillLevel: SkillLevelType;
  workout: WorkoutType[];
  workoutDuration: WorkoutDurationType;
  caloriesToLose: number;
  dailyCalorieBurn: number;
  isReadyForTraining: boolean;
  createdAt: Date;
  updatedAt: Date;
}

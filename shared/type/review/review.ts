import {Training} from "../training/training";
import {User} from "../user/user";

export interface Review {
  id?: string;
  user: User;
  training: Training;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

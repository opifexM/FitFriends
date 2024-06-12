import {Training} from "../training/training";
import {User} from "../user/user";

export interface Balance {
  id?: string;
  user: User;
  training: Training;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

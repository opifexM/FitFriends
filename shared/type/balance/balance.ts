import {Types} from "mongoose";

export interface Balance {
  id?: string;
  user: Types.ObjectId;
  training: Types.ObjectId;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

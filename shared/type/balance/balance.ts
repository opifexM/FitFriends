import { Types } from 'mongoose';

export interface Balance {
  id?: string;
  user: Types.ObjectId;
  training: Types.ObjectId;
  totalCount: number;
  availableCount: number;
  createdAt: Date;
  updatedAt: Date;
}

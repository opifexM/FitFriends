import { Types } from 'mongoose';

export interface Review {
  id?: string;
  user: Types.ObjectId;
  training: Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

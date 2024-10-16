import { Types } from 'mongoose';

export interface Notify {
  user: Types.ObjectId;
  text: string;
  topic: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

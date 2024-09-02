import { Types } from 'mongoose';
import { RequestStatusType } from '../enum/request-status-type.enum';

export interface Friend {
  id?: string;
  friend: Types.ObjectId;
  friendInitiator: Types.ObjectId;
  requestInitiator: string;
  requestStatus: RequestStatusType;
  createdAt: Date;
  updatedAt: Date;
}

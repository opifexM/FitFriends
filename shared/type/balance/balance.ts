import { Types } from 'mongoose';
import { PurchaseStatusType } from '../enum/purchase-status-type.enum';

export interface Balance {
  id?: string;
  user: Types.ObjectId;
  training: Types.ObjectId;
  totalCount: number;
  availableCount: number;
  purchaseStatus: PurchaseStatusType;
  createdAt: Date;
  updatedAt: Date;
}

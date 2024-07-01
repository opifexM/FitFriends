import { Types } from 'mongoose';
import { PaymentStatusType } from '../enum/payment-status-type.enum';
import { PaymentType } from '../enum/payment-type.enum';
import { PurchaseType } from '../enum/purchase-type.enum';

export interface Order {
  id?: string;
  user: Types.ObjectId;
  purchase: PurchaseType;
  service: Types.ObjectId;
  price: number;
  count: number;
  totalPrice: number;
  paymentStatus: PaymentStatusType;
  payment: PaymentType;
  createdAt: Date;
  updatedAt: Date;
}

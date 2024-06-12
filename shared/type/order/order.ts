import {PaymentType} from "../enum/payment-type.enum";
import {PurchaseType} from "../enum/purchase-type.enum";
import {Training} from "../training/training";

export interface Order {
  id?: string;
  purchase: PurchaseType;
  service: Training;
  price: number;
  count: number;
  totalPrice: number;
  payment: PaymentType;
  createdAt: Date;
  updatedAt: Date;
}

import { PurchaseType } from '../enum/purchase-type.enum';

export const ORDER = {
  COUNT: {
    MIN: 1,
    MAX: 50,
  },
} as const;

export const CREATE_ORDER = {
  DEFAULT_COUNT: 1,
  DEFAULT_PURCHASE_TYPE: PurchaseType.SUBSCRIPTION,
} as const;

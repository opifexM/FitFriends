import { PurchaseType } from '../enum/purchase-type.enum';
import { SortDirection } from '../sort-direction.interface';
import { OrderSortType } from './order-sort-type.enum';

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

export const ORDER_LIST = {
  LIMIT: 4,
  DEFAULT_SORT_TYPE: OrderSortType.BY_COUNT,
  DEFAULT_SORT_DIRECTION: SortDirection.DESC,
  DEFAULT_FILTER_PAGE: 1,
} as const;

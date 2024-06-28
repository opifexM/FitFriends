import { SortDirection } from '../sort-direction.interface';
import { ReviewSortType } from './review-sort-type.enum';

export const REVIEW = {
  RATING: {
    MIN: 1,
    MAX: 5,
  },
  TEXT: {
    MIN: 100,
    MAX: 1024,
  },
} as const;

export const REVIEW_LIST = {
  LIMIT: 6,
  DEFAULT_SORT_TYPE: ReviewSortType.BY_DATE,
  DEFAULT_SORT_DIRECTION: SortDirection.DESC,
  DEFAULT_FILTER_PAGE: 1,
} as const;

import { TrainingSortType } from './training-sort-type.enum';

export const TRAINING = {
  NAME: {
    MIN: 1,
    MAX: 15,
  },
  PICTURE: {
    FORMATS: ['jpg', 'png'],
  },
  VIDEO: {
    FORMATS: ['mov', 'avi', 'mp4'],
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 140,
  },
  CALORIES: {
    MIN: 1000,
    MAX: 5000,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
} as const;

export const TRAINING_LIST = {
  LIMIT: 6,
  DEFAULT_SORT_TYPE: TrainingSortType.BY_DATE,
  DEFAULT_FILTER_PAGE: 1,
} as const;

export const TRAINING_MAIN = {
  SPECIAL_FOU_YOU_LIMIT: 9,
  SPECIAL_LIMIT: 3,
  POPULAR_LIMIT: 4,
  LOOK_FOR_COMPANY_LIMIT: 4,
} as const;

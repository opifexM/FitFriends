import { PublicUserSortType } from './public-user-sort-type.enum';

export const USER = {
  NAME: {
    MIN: 1,
    MAX: 15,
  },
  AVATAR: {
    MAX_SIZE_KB: 1024,
    FORMATS: ['.jpg', '.png'],
  },
  PROFILE_PICTURE: {
    MAX_SIZE_KB: 1024,
    FORMATS: ['.jpg', '.png'],
  },
  PASSWORD: {
    MIN: 6,
    MAX: 12,
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 140,
  },
} as const;

export const USER_MAIN = {
  DEFAULT_FILTER_PAGE: 1,
  LOOK_FOR_COMPANY_SHOW_LIMIT: 4,
  LOOK_FOR_COMPANY_MAX_LIMIT: 8,
} as const;

export const USER_LIST = {
  LIMIT: 6,
  DEFAULT_SORT_TYPE: PublicUserSortType.BY_DATE,
  DEFAULT_FILTER_PAGE: 1,
  FILTER_ELEMENT_LIMIT: 5,
} as const;

export const USER = {
  NAME: {
    MIN: 1,
    MAX: 15,
  },
  AVATAR: {
    MAX_SIZE_KB: 1024,
    FORMATS: ['jpg', 'png'],
  },
  PROFILE_PICTURE: {
    MAX_SIZE_KB: 1024,
    FORMATS: ['jpg', 'png'],
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

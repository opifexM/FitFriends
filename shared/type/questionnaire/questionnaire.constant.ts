export const QUESTIONNAIRE = {
  WORKOUT: {
    MAX: 3,
  },
  CALORIES_TO_LOSE: {
    MIN: 1000,
    MAX: 5000,
  },
  DAILY_CALORIE_BURN: {
    MIN: 1000,
    MAX: 5000,
  },
  EXPERIENCE: {
    MIN: 10,
    MAX: 140,
  },
  CERTIFICATE: {
    FORMATS: ['.pdf'],
    MAX_SIZE_KB: 5120,
  },
} as const;

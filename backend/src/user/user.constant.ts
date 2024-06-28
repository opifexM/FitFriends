export const USER_MESSAGES = {
  EXISTS: 'User with this email exists',
  NOT_FOUND: 'User not found',
  AUTHENTICATION_PASSWORD_WRONG: 'User password is wrong',
  NOT_COACH: 'User is not coach',
} as const;

export const USER_DEFAULT = {
  PROFILE_PICTURE_ID: '123e4567-e89b-12d3-a456-426614174001',
  AVATAR_ID: '123e4567-e89b-12d3-a456-426614174001',
  DESCRIPTION: '(empty)',
} as const;

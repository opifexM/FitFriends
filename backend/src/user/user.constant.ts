export const USER_MESSAGES = {
  EXISTS: 'User with this email exists',
  NOT_FOUND: 'User not found',
  AUTHENTICATION_PASSWORD_WRONG: 'User password is wrong',
  NOT_COACH: 'User is not coach',
  NO_ACCESS: 'Access to this user details is not permitted',
} as const;

export const USER_DEFAULT = {
  PROFILE_PICTURE_ID: 'default_background.jpg',
  AVATAR_ID: 'default_avatar.png',
  DESCRIPTION: '(empty)',
} as const;

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Intro: '/intro',
  User: '/user',
  UserId: '/user/:id',
  Questionnaire: '/questionnaire',
  Training: '/training',
  CreateTraining: '/create-training',
  ListTraining: '/trainings',
  TrainingCard: '/training/:trainingId',
  BalancePurchase: '/my-purchase',
  PersonalAccount: '/personal-account',
} as const;
export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];

export const APIRoute = {
  CreateUser: 'users',
  GetUser: 'users',
  UpdateUser: 'users',
  DeleteUser: 'users',
  Login: 'users/login',
  CheckAuth: 'users/check',
  RefreshAuth: 'users/refresh',
  CreateQuestionnaire: 'questionnaires',
  GetQuestionnaire: 'questionnaires/:questionnaireId',
  GetLatestQuestionnaire: 'questionnaires/latest',
  UpdateQuestionnaire: 'questionnaires/:questionnaireId',
  DeleteQuestionnaire: 'questionnaires/:questionnaireId',
  CreateBalance: 'balances',
  GetBalances: 'balances',
  GetBalance: 'balances/:balanceId',
  GetBalancePurchase: 'balances/purchase',
  ActivateBalancePurchase: 'balances/:balanceId',
  DeactivateBalancePurchase: 'balances/:balanceId',
  CreateTraining: 'trainings',
  GetTraining: 'trainings/:trainingId',
  GetTrainingList: 'trainings',
  GetTrainingFouYouList: 'trainings/for-you',
  UpdateTraining: 'trainings/:trainingId',
  DeleteTraining: 'trainings/:trainingId',
  CreateReview: 'reviews',
  GetReview: 'reviews/:reviewId',
  GetReviewByTraining: 'reviews/training/:trainingId',
  GetLatestReview: 'reviews/latest',
  UpdateReview: 'reviews/:reviewId',
  DeleteReview: 'reviews/:reviewId',
  CreateOrder: 'orders',
  GetOrder: 'orders/:orderId',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;
export type AuthorizationStatusType =
  (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];

export const NameSpace = {
  ApiCommunication: 'API_COMMUNICATION',
  UiSetting: 'UI_SETTINGS',
} as const;

export const BACKEND = {
  URL: 'http://localhost:3000/api',
  REQUEST_TIMEOUT: 5000,
} as const;

export const AUTH_TOKEN = {
  ACCESS_KEY: 'fit-friends-access-token',
  REFRESH_KEY: 'fit-friends-refresh-token',
} as const;

export const UPLOAD_DIRECTORY = 'file/';

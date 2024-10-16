export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Intro: '/intro',
  User: '/user',
  ListUsers: '/users',
  UserId: '/user/:id',
  Questionnaire: '/questionnaire',
  Training: '/training',
  CreateTraining: '/create-training',
  ListTraining: '/trainings',
  TrainingCard: '/training/:trainingId',
  BalancePurchase: '/my-purchase',
  MyOrder: '/my-order',
  MyFriend: '/my-friend',
  PersonalAccount: '/personal-account',
  PublicAccount: '/public-account',
  PublicAccountId: '/public-account/:userId',
} as const;
export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];

export const APIRoute = {
  CreateUser: 'users',
  GetUser: 'users',
  GetPublicUserDetail: 'users/public/:publicUserId',
  GetPublicUsers: 'users/public-users',
  SubscribeCoach: 'users/subscription/:publicUserId',
  UnsubscribeCoach: 'users/subscription/:publicUserId',
  UpdateUser: 'users',
  DeleteUser: 'users',
  Login: 'users/login',
  CheckAuth: 'users/check',
  RefreshAuth: 'users/refresh',
  GetSpecialLookingUser: 'users/looking-for-training',
  CreateVisitorQuestionnaire: 'questionnaires/visitor',
  CreateCoachQuestionnaire: 'questionnaires/coach',
  GetQuestionnaire: 'questionnaires/:questionnaireId',
  GetLatestQuestionnaire: 'questionnaires/latest',
  UpdateVisitorQuestionnaire: 'questionnaires/visitor/:questionnaireId',
  UpdateCoachQuestionnaire: 'questionnaires/coach/:questionnaireId',
  UpdateCoachFileQuestionnaire:
    'questionnaires/coach/:questionnaireId/file/:fileId',
  UploadCoachFileQuestionnaire: 'questionnaires/coach/:questionnaireId/file',
  DeleteCoachFileQuestionnaire:
    'questionnaires/coach/:questionnaireId/file/:fileId',
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
  GetTrainingSpecialPrice: 'trainings/special',
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
  GetMyOrder: 'orders/my-order',
  AddFriend: 'friends',
  RemoveFriend: 'friends/:friendId',
  ChangeFriendRequestStatus: 'friends/:friendId',
  GetMyFriend: 'friends/my-friend',
  GetMyNotification: 'notifications',
  ReadNotification: 'notifications/:notificationId',
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
  REQUEST_TIMEOUT: 20000,
} as const;

export const AUTH_TOKEN = {
  ACCESS_KEY: 'fit-friends-access-token',
  REFRESH_KEY: 'fit-friends-refresh-token',
  REFRESH_BEFORE_MIN: 5,
} as const;

export const UPLOAD_DIRECTORY = 'file/';

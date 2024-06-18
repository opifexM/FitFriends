import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { SortType } from 'shared/type/sort-type.enum.ts';

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Intro: '/intro',
  User: '/user',
  UserId: '/user/:id',
} as const;
export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];

export const APIRoute = {
  CreateUser: 'users',
  GetUser: 'users/:userId',
  UpdateUser: 'users/:userId',
  DeleteUser: 'users/:userId',
  Login: 'users/login',
  CheckAuth: 'users/check',
  RefreshAuth: 'users/refresh',
  CreateQuestionnaire: 'questionnaires',
  GetQuestionnaire: 'questionnaires/:productId',
  UpdateQuestionnaire: 'questionnaires/:productId',
  DeleteQuestionnaire: 'questionnaires/:productId',
  CreateBalance: 'balances',
  GetBalance: 'balances/:productId',
  UpdateBalance: 'balances/:productId',
  DeleteBalance: 'balances/:productId',
  CreateTraining: 'trainings',
  GetTraining: 'trainings/:productId',
  UpdateTraining: 'trainings/:productId',
  DeleteTraining: 'trainings/:productId',
  CreateReview: 'reviews',
  GetReview: 'reviews/:productId',
  UpdateReview: 'reviews/:productId',
  DeleteReview: 'reviews/:productId',
  CreateOrder: 'orders',
  GetOrder: 'orders/:productId',
  UpdateOrder: 'orders/:productId',
  DeleteOrder: 'orders/:productId',
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
} as const;

export const BACKEND_URL = 'http://localhost:3000/api';
export const BACKEND_REQUEST_TIMEOUT = 5000;
export const AUTH_ACCESS_TOKEN_KEY_NAME = 'fit-friends-access-token';
export const AUTH_REFRESH_TOKEN_KEY_NAME = 'fit-friends-refresh-token';

export const DEFAULT_SORT_TYPE = SortType.BY_PRICE;
export const DEFAULT_SORT_DIRECTION = SortDirection.ASC;
export const DEFAULT_FILTER_PAGE = 1;

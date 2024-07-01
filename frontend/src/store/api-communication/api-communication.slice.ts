import { createSlice } from '@reduxjs/toolkit';
import { BALANCE_PURCHASE_LIST } from 'shared/type/balance/balance.constant.ts';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto.ts';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { TRAINING_LIST } from 'shared/type/training/traning.constant.ts';
import {
  AUTH_TOKEN,
  AuthorizationStatus,
  AuthorizationStatusType,
  NameSpace,
} from '../../const.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import {
  createOrder,
  createQuestionnaire,
  createReview,
  createTraining,
  fetchLatestQuestionnaire,
  fetchLatestReview,
  fetchPurchase,
  fetchReviewByTraining,
  fetchTraining,
  fetchTrainingDetail,
  updateQuestionnaire,
  updateReview,
} from '../api-action/data-action.ts';
import {
  checkAuthAction,
  loginAction,
  refreshAuthAction,
  registerAction,
} from '../api-action/user-auth-action.ts';

interface ApiCommunicationState {
  isLoading: boolean;
  userName: string;
  userLogin: string;
  userId: string;
  authorizationStatus: AuthorizationStatusType;
  lastQuestionnaire: QuestionnaireDto | null;
  trainings: TrainingDto[];
  currentTraining: TrainingDto | null;
  reviews: ReviewDto[];
  lastReview: ReviewDto | null;
  purchases: TrainingDto[];
}

const initialState: ApiCommunicationState = {
  isLoading: false,
  userName: '',
  userLogin: '',
  userId: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  lastQuestionnaire: null,
  trainings: [],
  currentTraining: null,
  reviews: [],
  lastReview: null,
  purchases: [],
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.isLoading = true;
      })
      .addCase(registerAction.rejected, (state) => {
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })

      .addCase(loginAction.pending, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { id, email, accessToken, refreshToken } = action.payload;
        saveToken(AUTH_TOKEN.ACCESS_KEY, accessToken);
        saveToken(AUTH_TOKEN.REFRESH_KEY, refreshToken);
        state.userLogin = email;
        state.userId = id;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.userLogin = '';
        state.userName = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        const { sub, email, name } = action.payload;
        state.userLogin = email;
        state.userName = name;
        state.userId = sub;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(refreshAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAuthAction.rejected, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.userLogin = '';
        state.userName = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(refreshAuthAction.fulfilled, (state, action) => {
        const { refreshToken, accessToken } = action.payload;
        saveToken(AUTH_TOKEN.ACCESS_KEY, accessToken);
        saveToken(AUTH_TOKEN.REFRESH_KEY, refreshToken);
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(fetchLatestQuestionnaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLatestQuestionnaire.rejected, (state) => {
        state.lastQuestionnaire = null;
        state.isLoading = false;
      })
      .addCase(fetchLatestQuestionnaire.fulfilled, (state, action) => {
        state.lastQuestionnaire = action.payload;
        state.isLoading = false;
      })

      .addCase(createQuestionnaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionnaire.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createQuestionnaire.fulfilled, (state, action) => {
        state.lastQuestionnaire = action.payload;
        state.isLoading = false;
      })

      .addCase(updateQuestionnaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestionnaire.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateQuestionnaire.fulfilled, (state, action) => {
        state.lastQuestionnaire = action.payload;
        state.isLoading = false;
      })

      .addCase(createTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTraining.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTraining.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTraining.rejected, (state) => {
        state.trainings = [];
        state.isLoading = false;
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        const { currentPage, entities } = action.payload;
        if (currentPage === TRAINING_LIST.DEFAULT_FILTER_PAGE) {
          state.trainings = entities;
        } else {
          state.trainings = [...state.trainings, ...entities];
        }
        state.isLoading = false;
      })

      .addCase(fetchTrainingDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainingDetail.rejected, (state) => {
        state.currentTraining = null;
        state.isLoading = false;
      })
      .addCase(fetchTrainingDetail.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchReviewByTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewByTraining.rejected, (state) => {
        state.reviews = [];
        state.isLoading = false;
      })
      .addCase(fetchReviewByTraining.fulfilled, (state, action) => {
        state.reviews = action.payload.entities;
        state.isLoading = false;
      })

      .addCase(fetchLatestReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLatestReview.rejected, (state) => {
        state.lastReview = null;
        state.isLoading = false;
      })
      .addCase(fetchLatestReview.fulfilled, (state, action) => {
        state.lastReview = action.payload;
        state.isLoading = false;
      })

      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.lastReview = action.payload;
        state.isLoading = false;
      })

      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReview.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.lastReview = action.payload;
        state.isLoading = false;
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPurchase.rejected, (state) => {
        state.purchases = [];
        state.isLoading = false;
      })
      .addCase(fetchPurchase.fulfilled, (state, action) => {
        const { currentPage, entities } = action.payload;
        if (currentPage === BALANCE_PURCHASE_LIST.DEFAULT_FILTER_PAGE) {
          state.purchases = entities;
        } else {
          state.purchases = [...state.purchases, ...entities];
        }
        state.isLoading = false;
      });
  },
});

export const { resetAuthStatus } = apiCommunicationSlice.actions;

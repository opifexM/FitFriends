import { createSlice } from '@reduxjs/toolkit';
import { BALANCE_PURCHASE_LIST } from 'shared/type/balance/balance.constant.ts';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto.ts';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto.ts';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { TRAINING_LIST } from 'shared/type/training/traning.constant.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import {
  AUTH_TOKEN,
  AuthorizationStatus,
  AuthorizationStatusType,
  NameSpace,
} from '../../const.ts';
import { dropToken, saveToken } from '../../services/token.ts';
import {
  activateBalancePurchase,
  createOrder,
  createQuestionnaire,
  createReview,
  createTraining,
  deactivateBalancePurchase,
  fetchBalances,
  fetchLatestQuestionnaire,
  fetchLatestReview,
  fetchPurchase,
  fetchReviewByTraining,
  fetchTraining,
  fetchTrainingDetail,
  fetchTrainingFouYou,
  fetchUserDetail,
  updateQuestionnaire,
  updateReview,
} from '../api-action/data-action.ts';
import {
  checkAuth,
  fetchUser,
  loginAuth,
  refreshAuth,
  registerAuth,
  updateUser,
} from '../api-action/user-auth-action.ts';

interface ApiCommunicationState {
  isLoading: boolean;
  authorizationStatus: AuthorizationStatusType;
  lastQuestionnaire: QuestionnaireDto | null;
  trainings: TrainingDto[];
  currentTraining: TrainingDto | null;
  reviews: ReviewDto[];
  lastReview: ReviewDto | null;
  purchases: TrainingDto[];
  balances: BalanceDto[];
  userDetail: UserDto | null;
  trainingsForYou: TrainingDto[];
}

const initialState: ApiCommunicationState = {
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  lastQuestionnaire: null,
  trainings: [],
  currentTraining: null,
  reviews: [],
  lastReview: null,
  purchases: [],
  userDetail: null,
  trainingsForYou: [],
  balances: [],
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
      .addCase(registerAuth.pending, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.isLoading = true;
      })
      .addCase(registerAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(registerAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })

      .addCase(loginAuth.pending, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.isLoading = true;
      })
      .addCase(loginAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        saveToken(AUTH_TOKEN.ACCESS_KEY, accessToken);
        saveToken(AUTH_TOKEN.REFRESH_KEY, refreshToken);
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userDetail = null;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isLoading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isLoading = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(refreshAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAuth.rejected, (state) => {
        dropToken(AUTH_TOKEN.ACCESS_KEY);
        dropToken(AUTH_TOKEN.REFRESH_KEY);
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
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

      .addCase(fetchTraining.rejected, (state) => {
        state.trainings = [];
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        const { currentPage, entities } = action.payload;
        if (currentPage === TRAINING_LIST.DEFAULT_FILTER_PAGE) {
          state.trainings = entities;
        } else {
          const existingTrainingIds = new Set(
            state.trainings.map((training) => training.id),
          );
          const newEntities = entities.filter(
            (entity) => !existingTrainingIds.has(entity.id),
          );
          state.trainings = [...state.trainings, ...newEntities];
        }
      })

      .addCase(fetchTrainingFouYou.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainingFouYou.rejected, (state) => {
        state.trainingsForYou = [];
        state.isLoading = false;
      })
      .addCase(fetchTrainingFouYou.fulfilled, (state, action) => {
        state.trainingsForYou = action.payload.entities;
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
          const existingPurchaseIds = new Set(
            state.purchases.map((purchase) => purchase.id),
          );
          const newEntities = entities.filter(
            (entity) => !existingPurchaseIds.has(entity.id),
          );
          state.purchases = [...state.purchases, ...newEntities];
        }
        state.isLoading = false;
      })

      .addCase(fetchBalances.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBalances.rejected, (state) => {
        state.balances = [];
        state.isLoading = false;
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.balances = action.payload;
        state.isLoading = false;
      })

      .addCase(activateBalancePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateBalancePurchase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(activateBalancePurchase.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(deactivateBalancePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactivateBalancePurchase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deactivateBalancePurchase.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetail.rejected, (state) => {
        state.userDetail = null;
        state.isLoading = false;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isLoading = false;
      });
  },
});

export const { resetAuthStatus } = apiCommunicationSlice.actions;

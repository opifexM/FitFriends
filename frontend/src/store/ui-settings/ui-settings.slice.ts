import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BALANCE_PURCHASE_LIST } from 'shared/type/balance/balance.constant.ts';
import { LocationType } from 'shared/type/enum/location-type.enum.ts';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { FRIEND_LIST } from 'shared/type/friend/friend.constant.ts';
import { OrderSortType } from 'shared/type/order/order-sort-type.enum.ts';
import { ORDER_LIST } from 'shared/type/order/order.constant.ts';
import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { TrainingSortType } from 'shared/type/training/training-sort-type.enum.ts';
import {
  TRAINING,
  TRAINING_LIST,
} from 'shared/type/training/traning.constant.ts';
import { PublicUserSortType } from 'shared/type/user/public-user-sort-type.enum.ts';
import { USER_LIST } from 'shared/type/user/user.constant.ts';
import { NameSpace } from '../../const.ts';
import { MenuType } from '../../type/menu-type.enum.ts';
import {
  fetchLatestQuestionnaire,
  fetchMyFriend,
  fetchMyOrder,
  fetchPublicUser,
  fetchPurchase,
  fetchTraining,
  fetchTrainingFouYou,
} from '../api-action/data-action.ts';

interface TrainingFilter {
  workout: WorkoutType[];
  trainingSortType: TrainingSortType;
  priceFrom: number;
  priceTo: number;
  caloriesFrom: number;
  caloriesTo: number;
  ratingFrom: number;
  ratingTo: number;
  priceMin: number;
  priceMax: number;
  caloriesMin: number;
  caloriesMax: number;
  ratingMin: number;
  ratingMax: number;
  totalPages: number;
  currentPage: number;
  isReset: boolean;
  coachId: string;
}

interface PublicUserFilter {
  workout: WorkoutType[];
  location: LocationType[];
  skillLevel: SkillLevelType;
  publicUserSortType: PublicUserSortType;
  totalPages: number;
  currentPage: number;
}

interface PurchaseFilter {
  isActive: boolean;
  totalPages: number;
  currentPage: number;
}

interface MyOrderFilter {
  orderSortType: OrderSortType;
  orderSortDirection: SortDirection;
  totalPages: number;
  currentPage: number;
}

interface MyFriendFilter {
  totalPages: number;
  currentPage: number;
}

interface UiSettingsSlice {
  trainingFilter: TrainingFilter;
  purchaseFilter: PurchaseFilter;
  myOrderFilter: MyOrderFilter;
  myFriendFilter: MyFriendFilter;
  publicUserFilter: PublicUserFilter;
  isReviewCreatePopupOpen: boolean;
  isPurchasePopupOpen: boolean;
  isQuestionnaireOpen: boolean;
  isCertificateViewOpen: boolean;
  isLocationViewOpen: boolean;
  menuStatus: MenuType;
}

const initialState: UiSettingsSlice = {
  trainingFilter: {
    workout: Object.values(WorkoutType),
    trainingSortType: TRAINING_LIST.DEFAULT_SORT_TYPE,
    priceFrom: 0,
    priceTo: Number.MAX_SAFE_INTEGER,
    caloriesFrom: TRAINING.CALORIES.MIN,
    caloriesTo: TRAINING.CALORIES.MAX,
    ratingFrom: TRAINING.RATING.MIN,
    ratingTo: TRAINING.RATING.MAX,
    priceMin: 0,
    priceMax: 0,
    caloriesMin: 0,
    caloriesMax: 0,
    ratingMin: 0,
    ratingMax: 0,
    totalPages: 0,
    currentPage: TRAINING_LIST.DEFAULT_FILTER_PAGE,
    coachId: '',
    isReset: false,
  },
  purchaseFilter: {
    totalPages: 0,
    currentPage: BALANCE_PURCHASE_LIST.DEFAULT_FILTER_PAGE,
    isActive: false,
  },
  myOrderFilter: {
    totalPages: 0,
    currentPage: ORDER_LIST.DEFAULT_FILTER_PAGE,
    orderSortType: ORDER_LIST.DEFAULT_SORT_TYPE,
    orderSortDirection: ORDER_LIST.DEFAULT_SORT_DIRECTION,
  },
  myFriendFilter: {
    totalPages: 0,
    currentPage: FRIEND_LIST.DEFAULT_FILTER_PAGE,
  },
  publicUserFilter: {
    totalPages: 0,
    workout: Object.values(WorkoutType),
    location: Object.values(LocationType),
    skillLevel: SkillLevelType.BEGINNER,
    publicUserSortType: USER_LIST.DEFAULT_SORT_TYPE,
    currentPage: USER_LIST.DEFAULT_FILTER_PAGE,
  },
  isReviewCreatePopupOpen: false,
  isPurchasePopupOpen: false,
  isQuestionnaireOpen: false,
  isCertificateViewOpen: false,
  isLocationViewOpen: false,
  menuStatus: MenuType.NONE,
};

export const uiSettingsSlice = createSlice({
  name: NameSpace.UiSetting,
  initialState,
  reducers: {
    setIsReviewCreatePopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isReviewCreatePopupOpen = action.payload;
    },
    setIsPurchasePopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isPurchasePopupOpen = action.payload;
    },
    setIsQuestionnaireOpen: (state, action: PayloadAction<boolean>) => {
      state.isQuestionnaireOpen = action.payload;
    },
    setIsCertificateViewOpen: (state, action: PayloadAction<boolean>) => {
      state.isCertificateViewOpen = action.payload;
    },
    setIsLocationViewOpen: (state, action: PayloadAction<boolean>) => {
      state.isLocationViewOpen = action.payload;
    },

    setMenuStatus: (state, action: PayloadAction<MenuType>) => {
      state.menuStatus = action.payload;
    },

    resetTrainingFilter: (state) => {
      state.trainingFilter.isReset = true;
    },
    setTrainingFilterWorkout: (state, action: PayloadAction<WorkoutType[]>) => {
      state.trainingFilter.workout = action.payload;
    },
    setTrainingFilterTrainingSortType: (
      state,
      action: PayloadAction<TrainingSortType>,
    ) => {
      state.trainingFilter.trainingSortType = action.payload;
    },
    setTrainingFilterPriceFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceFrom = action.payload;
    },
    setTrainingFilterPriceTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceTo = action.payload;
    },
    setTrainingFilterCaloriesFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesFrom = action.payload;
    },
    setTrainingFilterCaloriesTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesTo = action.payload;
    },
    setTrainingFilterRatingFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingFrom = action.payload;
    },
    setTrainingFilterRatingTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingTo = action.payload;
    },
    setTrainingFilterCoachId: (state, action: PayloadAction<string>) => {
      state.trainingFilter.coachId = action.payload;
    },
    increaseTrainingFilterCurrentPage: (state) => {
      state.trainingFilter.currentPage++;
    },

    setPurchaseFilterIsActive: (state, action: PayloadAction<boolean>) => {
      state.purchaseFilter.isActive = action.payload;
    },
    increasePurchaseFilterCurrentPage: (state) => {
      state.purchaseFilter.currentPage++;
    },

    increaseMyOrderFilterCurrentPage: (state) => {
      state.myOrderFilter.currentPage++;
    },
    setOrderSortTypeFilter: (state, action: PayloadAction<OrderSortType>) => {
      state.myOrderFilter.orderSortType = action.payload;
    },
    setOrderSortDirectionFilter: (
      state,
      action: PayloadAction<SortDirection>,
    ) => {
      state.myOrderFilter.orderSortDirection = action.payload;
    },

    increaseMyFriendFilterCurrentPage: (state) => {
      state.myFriendFilter.currentPage++;
    },

    setPublicUserFilterWorkout: (
      state,
      action: PayloadAction<WorkoutType[]>,
    ) => {
      state.publicUserFilter.workout = action.payload;
    },
    setPublicUserFilterLocation: (
      state,
      action: PayloadAction<LocationType[]>,
    ) => {
      state.publicUserFilter.location = action.payload;
    },
    setPublicUserFilterSkillLevel: (
      state,
      action: PayloadAction<SkillLevelType>,
    ) => {
      state.publicUserFilter.skillLevel = action.payload;
    },
    setPublicUserFilterTrainingSortType: (
      state,
      action: PayloadAction<PublicUserSortType>,
    ) => {
      state.publicUserFilter.publicUserSortType = action.payload;
    },
    increasePublicUserFilterCurrentPage: (state) => {
      state.publicUserFilter.currentPage++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTraining.fulfilled, (state, action) => {
        const {
          currentPage,
          totalPages,
          caloriesMax,
          caloriesMin,
          priceMax,
          priceMin,
          ratingMax,
          ratingMin,
        } = action.payload;
        state.trainingFilter.currentPage = currentPage;
        state.trainingFilter.totalPages = totalPages;

        state.trainingFilter.caloriesMax = caloriesMax;
        state.trainingFilter.caloriesMin = caloriesMin;
        state.trainingFilter.priceMax = priceMax;
        state.trainingFilter.priceMin = priceMin;
        state.trainingFilter.ratingMax = ratingMax;
        state.trainingFilter.ratingMin = ratingMin;

        if (state.trainingFilter.isReset) {
          state.trainingFilter.priceFrom = priceMin;
          state.trainingFilter.priceTo = priceMax;
          state.trainingFilter.caloriesFrom = caloriesMin;
          state.trainingFilter.caloriesTo = caloriesMax;
          state.trainingFilter.ratingFrom = ratingMin;
          state.trainingFilter.ratingTo = ratingMax;
          state.trainingFilter.isReset = false;
        } else {
          state.trainingFilter.priceFrom = Math.max(
            priceMin,
            state.trainingFilter.priceFrom,
          );
          state.trainingFilter.priceTo = Math.min(
            priceMax,
            state.trainingFilter.priceTo,
          );
          state.trainingFilter.caloriesFrom = Math.max(
            caloriesMin,
            state.trainingFilter.caloriesFrom,
          );
          state.trainingFilter.caloriesTo = Math.min(
            caloriesMax,
            state.trainingFilter.caloriesTo,
          );
          state.trainingFilter.ratingFrom = Math.max(
            ratingMin,
            state.trainingFilter.ratingFrom,
          );
          state.trainingFilter.ratingTo = Math.min(
            ratingMax,
            state.trainingFilter.ratingTo,
          );
        }
      })

      .addCase(fetchPublicUser.fulfilled, (state, action) => {
        const { currentPage, totalPages } = action.payload;
        state.publicUserFilter.currentPage = currentPage;
        state.publicUserFilter.totalPages = totalPages;
      })

      .addCase(fetchPurchase.fulfilled, (state, action) => {
        const { currentPage, totalPages } = action.payload;
        state.purchaseFilter.currentPage = currentPage;
        state.purchaseFilter.totalPages = totalPages;
      })

      .addCase(fetchMyOrder.fulfilled, (state, action) => {
        const { currentPage, totalPages } = action.payload;
        state.myOrderFilter.currentPage = currentPage;
        state.myOrderFilter.totalPages = totalPages;
      })

      .addCase(fetchMyFriend.fulfilled, (state, action) => {
        const { currentPage, totalPages } = action.payload;
        state.myFriendFilter.currentPage = currentPage;
        state.myFriendFilter.totalPages = totalPages;
      })

      .addCase(fetchTrainingFouYou.rejected, (state, action) => {
        if (action.payload === 'Questionnaire not found') {
          state.isQuestionnaireOpen = true;
        }
      })

      .addCase(fetchLatestQuestionnaire.rejected, (state, action) => {
        if (action.payload === 'Questionnaire not found') {
          state.isQuestionnaireOpen = true;
        }
      });
  },
});

export const {
  resetTrainingFilter,
  setTrainingFilterPriceFrom,
  setTrainingFilterPriceTo,
  setTrainingFilterCaloriesFrom,
  setTrainingFilterCaloriesTo,
  setTrainingFilterRatingFrom,
  setTrainingFilterRatingTo,
  setTrainingFilterWorkout,
  setTrainingFilterTrainingSortType,
  increaseTrainingFilterCurrentPage,
  setIsReviewCreatePopupOpen,
  setIsPurchasePopupOpen,
  increasePurchaseFilterCurrentPage,
  setPurchaseFilterIsActive,
  setMenuStatus,
  setIsQuestionnaireOpen,
  setTrainingFilterCoachId,
  increaseMyOrderFilterCurrentPage,
  setOrderSortTypeFilter,
  setOrderSortDirectionFilter,
  setIsCertificateViewOpen,
  increaseMyFriendFilterCurrentPage,
  increasePublicUserFilterCurrentPage,
  setPublicUserFilterLocation,
  setPublicUserFilterSkillLevel,
  setPublicUserFilterTrainingSortType,
  setPublicUserFilterWorkout,
  setIsLocationViewOpen,
} = uiSettingsSlice.actions;

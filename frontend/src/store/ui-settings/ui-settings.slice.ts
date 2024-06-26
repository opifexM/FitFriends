import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BALANCE_PURCHASE_LIST } from 'shared/type/balance/balance.constant.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { TrainingSortType } from 'shared/type/training/training-sort-type.enum.ts';
import {
  TRAINING,
  TRAINING_LIST,
} from 'shared/type/training/traning.constant.ts';
import { NameSpace } from '../../const.ts';
import { fetchTraining } from '../api-action/data-action.ts';

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
}

interface PurchaseFilter {
  isActive: boolean;
  totalPages: number;
  currentPage: number;
}

interface UiSettingsSlice {
  trainingFilter: TrainingFilter;
  purchaseFilter: PurchaseFilter;
  isReviewCreatePopupOpen: boolean;
  isPurchasePopupOpen: boolean;
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
    ratingTo: TRAINING.CALORIES.MAX,
    priceMin: 0,
    priceMax: 0,
    caloriesMin: 0,
    caloriesMax: 0,
    ratingMin: 0,
    ratingMax: 0,
    totalPages: 0,
    currentPage: TRAINING_LIST.DEFAULT_FILTER_PAGE,
  },
  purchaseFilter: {
    totalPages: 0,
    currentPage: BALANCE_PURCHASE_LIST.DEFAULT_FILTER_PAGE,
    isActive: false,
  },
  isReviewCreatePopupOpen: false,
  isPurchasePopupOpen: false,
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
    resetTrainingFilter: (state) => {
      state.trainingFilter = initialState.trainingFilter;
    },
    setTrainingFilterWorkout: (state, action: PayloadAction<WorkoutType[]>) => {
      state.trainingFilter.workout = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterTrainingSortType: (
      state,
      action: PayloadAction<TrainingSortType>,
    ) => {
      state.trainingFilter.trainingSortType = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterPriceFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterPriceTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterCaloriesFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterCaloriesTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterRatingFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterRatingTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterPriceMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterPriceMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterCaloriesMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterCaloriesMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterRatingMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterRatingMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingFilterTotalPages: (state, action: PayloadAction<number>) => {
      state.trainingFilter.totalPages = action.payload;
    },
    increaseTrainingFilterCurrentPage: (state) => {
      state.trainingFilter.currentPage++;
    },
    resetTrainingFilterCurrentPage: (state) => {
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    resetPurchaseFilter: (state) => {
      state.purchaseFilter = initialState.purchaseFilter;
    },
    setPurchaseFilterIsActive: (state, action: PayloadAction<boolean>) => {
      state.purchaseFilter.isActive = action.payload;
    },
    increasePurchaseFilterCurrentPage: (state) => {
      state.purchaseFilter.currentPage++;
    },
    resetPurchaseFilterCurrentPage: (state) => {
      state.purchaseFilter.currentPage =
        initialState.purchaseFilter.currentPage;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTraining.fulfilled, (state, action) => {
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

      state.trainingFilter.priceFrom = Math.max(
        priceMin,
        state.trainingFilter.priceFrom,
      );
      state.trainingFilter.priceTo = Math.min(
        priceMax,
        state.trainingFilter.priceTo,
      );
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
  setTrainingFilterCaloriesMin,
  setTrainingFilterPriceMax,
  setTrainingFilterCaloriesMax,
  setTrainingFilterPriceMin,
  setTrainingFilterRatingMax,
  setTrainingFilterTotalPages,
  setTrainingFilterRatingMin,
  resetTrainingFilterCurrentPage,
  increaseTrainingFilterCurrentPage,
  setIsReviewCreatePopupOpen,
  setIsPurchasePopupOpen,
  increasePurchaseFilterCurrentPage,
  setPurchaseFilterIsActive,
  resetPurchaseFilterCurrentPage,
  resetPurchaseFilter,
} = uiSettingsSlice.actions;

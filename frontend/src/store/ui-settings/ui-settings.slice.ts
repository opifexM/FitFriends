import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

interface UiSettingsSlice {
  trainingFilter: TrainingFilter;
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
    setWorkout: (state, action: PayloadAction<WorkoutType[]>) => {
      state.trainingFilter.workout = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTrainingSortType: (state, action: PayloadAction<TrainingSortType>) => {
      state.trainingFilter.trainingSortType = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setPriceFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setPriceTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setCaloriesFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setCaloriesTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setRatingFrom: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingFrom = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setRatingTo: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingTo = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setPriceMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setPriceMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.priceMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setCaloriesMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setCaloriesMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.caloriesMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setRatingMin: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingMin = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setRatingMax: (state, action: PayloadAction<number>) => {
      state.trainingFilter.ratingMax = action.payload;
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.trainingFilter.totalPages = action.payload;
    },
    increaseCurrentPage: (state) => {
      state.trainingFilter.currentPage++;
    },
    resetCurrentPage: (state) => {
      state.trainingFilter.currentPage =
        initialState.trainingFilter.currentPage;
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
  setPriceFrom,
  setPriceTo,
  setCaloriesFrom,
  setCaloriesTo,
  setRatingFrom,
  setRatingTo,
  setWorkout,
  setTrainingSortType,
  setCaloriesMin,
  setPriceMax,
  setCaloriesMax,
  setPriceMin,
  setRatingMax,
  setTotalPages,
  setRatingMin,
  resetCurrentPage,
  increaseCurrentPage,
  setIsReviewCreatePopupOpen,
  setIsPurchasePopupOpen,
} = uiSettingsSlice.actions;

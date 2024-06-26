import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { BalanceTrainingQuery } from 'shared/type/balance/balance-training.query.ts';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto.ts';
import { OrderDto } from 'shared/type/order/dto/order.dto.ts';
import { CreateQuestionnaireDto } from 'shared/type/questionnaire/dto/create-questionnaire.dto.ts';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto.ts';
import { CreateReviewDto } from 'shared/type/review/dto/create-review.dto.ts';
import { ReviewPaginationDto } from 'shared/type/review/dto/review-pagination.dto.ts';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto.ts';
import { ReviewQuery } from 'shared/type/review/review.query.ts';
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto.ts';
import { TrainingPaginationDto } from 'shared/type/training/dto/training-pagination.dto.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { TrainingQuery } from 'shared/type/training/training.query.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../../services/api-error-handler.ts';
import { ThunkApiConfig } from '../state.ts';

export const fetchLatestQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  undefined,
  ThunkApiConfig
>(
  'data/fetchLatestQuestionnaire',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<QuestionnaireDto>(
        APIRoute.GetLatestQuestionnaire,
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  CreateQuestionnaireDto,
  ThunkApiConfig
>(
  'data/createQuestionnaire',
  async (questionnaireData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<QuestionnaireDto>(
        APIRoute.CreateQuestionnaire,
        questionnaireData,
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    questionnaireData: CreateQuestionnaireDto;
  },
  ThunkApiConfig
>(
  'data/updateQuestionnaire',
  async (
    { questionnaireId, questionnaireData },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const url = APIRoute.UpdateQuestionnaire.replace(
        ':questionnaireId',
        questionnaireId,
      );

      const { data } = await api.patch<QuestionnaireDto>(
        url,
        questionnaireData,
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createTraining = createAsyncThunk<
  TrainingDto,
  CreateTrainingDto,
  ThunkApiConfig
>(
  'data/createTraining',
  async (trainingData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<TrainingDto>(
        APIRoute.CreateTraining,
        trainingData,
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchTraining = createAsyncThunk<
  TrainingPaginationDto,
  TrainingQuery,
  ThunkApiConfig
>(
  'data/fetchTraining',
  async (trainingQuery, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<TrainingPaginationDto>(
        APIRoute.GetTrainingList,
        { params: trainingQuery },
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchTrainingDetail = createAsyncThunk<
  TrainingDto,
  string,
  ThunkApiConfig
>(
  'data/fetchTrainingDetail',
  async (trainingId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.GetTraining.replace(':trainingId', trainingId);

      const { data } = await api.get<TrainingDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchReviewByTraining = createAsyncThunk<
  ReviewPaginationDto,
  {
    trainingId: string;
    reviewQuery?: ReviewQuery;
  },
  ThunkApiConfig
>(
  'data/fetchReviewByTraining',
  async ({ trainingId, reviewQuery }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.GetReviewByTraining.replace(
        ':trainingId',
        trainingId,
      );

      const { data } = await api.get<ReviewPaginationDto>(url, {
        params: reviewQuery,
      });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchLatestReview = createAsyncThunk<
  ReviewDto,
  undefined,
  ThunkApiConfig
>('data/fetchLatestReview', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<ReviewDto>(APIRoute.GetLatestReview);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const createReview = createAsyncThunk<
  ReviewDto,
  CreateReviewDto,
  ThunkApiConfig
>('data/createReview', async (reviewData, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<ReviewDto>(
      APIRoute.CreateReview,
      reviewData,
    );

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const updateReview = createAsyncThunk<
  ReviewDto,
  {
    reviewId: string;
    reviewData: UpdateReviewDto;
  },
  ThunkApiConfig
>(
  'data/updateReview',
  async ({ reviewId, reviewData }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.UpdateReview.replace(':reviewId', reviewId);

      const { data } = await api.patch<ReviewDto>(url, reviewData);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createOrder = createAsyncThunk<
  OrderDto,
  CreateOrderDto,
  ThunkApiConfig
>('data/createOrder', async (reviewData, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<OrderDto>(APIRoute.CreateOrder, reviewData);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchPurchase = createAsyncThunk<
  TrainingPaginationDto,
  BalanceTrainingQuery,
  ThunkApiConfig
>(
  'data/fetchPurchase',
  async (balanceTrainingQuery, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<TrainingPaginationDto>(
        APIRoute.GetBalancePurchase,
        { params: balanceTrainingQuery },
      );

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

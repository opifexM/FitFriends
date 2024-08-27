import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { BalanceTrainingQuery } from 'shared/type/balance/balance-training.query.ts';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto.ts';
import { CreateOrderDto } from 'shared/type/order/dto/create-order.dto.ts';
import { MyOrderPaginationDto } from 'shared/type/order/dto/my-order-pagination.dto.ts';
import { OrderDto } from 'shared/type/order/dto/order.dto.ts';
import { MyOrderQuery } from 'shared/type/order/my-order.query.ts';
import { CreateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/create-coach-questionnaire.dto.ts';
import { CreateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/create-visitor-questionnaire.dto.ts';
import { QuestionnaireDto } from 'shared/type/questionnaire/dto/questionnaire.dto.ts';
import { UpdateCoachQuestionnaireDto } from 'shared/type/questionnaire/dto/update-coach-questionnaire.dto.ts';
import { UpdateVisitorQuestionnaireDto } from 'shared/type/questionnaire/dto/update-visitor-questionnaire.dto.ts';
import { UploadCoachFileQuestionnaireDto } from 'shared/type/questionnaire/dto/upload-coach-file-questionnaire.dto.ts';
import { CreateReviewDto } from 'shared/type/review/dto/create-review.dto.ts';
import { ReviewPaginationDto } from 'shared/type/review/dto/review-pagination.dto.ts';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { UpdateReviewDto } from 'shared/type/review/dto/update-review.dto.ts';
import { ReviewQuery } from 'shared/type/review/review.query.ts';
import { CreateTrainingDto } from 'shared/type/training/dto/create-training.dto.ts';
import { TrainingPaginationDto } from 'shared/type/training/dto/training-pagination.dto.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { UpdateTrainingDto } from 'shared/type/training/dto/update-training.dto.ts';
import { TrainingQuery } from 'shared/type/training/training.query.ts';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../../services/api/api-error-handler.ts';
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
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const createVisitorQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  CreateVisitorQuestionnaireDto,
  ThunkApiConfig
>(
  'data/createVisitorQuestionnaire',
  async (questionnaireData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<QuestionnaireDto>(
        APIRoute.CreateVisitorQuestionnaire,
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

export const createCoachQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  CreateCoachQuestionnaireDto,
  ThunkApiConfig
>(
  'data/createCoachQuestionnaire',
  async (formData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<QuestionnaireDto>(
        APIRoute.CreateCoachQuestionnaire,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

export const updateVisitorQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    questionnaireData: UpdateVisitorQuestionnaireDto;
  },
  ThunkApiConfig
>(
  'data/updateVisitorQuestionnaire',
  async (
    { questionnaireId, questionnaireData },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const url = APIRoute.UpdateVisitorQuestionnaire.replace(
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

export const updateCoachQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    questionnaireData: UpdateCoachQuestionnaireDto;
  },
  ThunkApiConfig
>(
  'data/updateCoachQuestionnaire',
  async (
    { questionnaireId, questionnaireData },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const url = APIRoute.UpdateCoachQuestionnaire.replace(
        ':questionnaireId',
        questionnaireId,
      );

      const { data } = await api.patch<QuestionnaireDto>(
        url,
        questionnaireData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

export const updateCoachFileQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    fileId: string;
    questionnaireData: UploadCoachFileQuestionnaireDto;
  },
  ThunkApiConfig
>(
  'data/updateCoachFileQuestionnaire',
  async (
    { questionnaireId, fileId, questionnaireData },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const url = APIRoute.UpdateCoachFileQuestionnaire.replace(
        ':questionnaireId',
        questionnaireId,
      ).replace(':fileId', fileId);

      const { data } = await api.patch<QuestionnaireDto>(
        url,
        questionnaireData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

export const uploadCoachFileQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    questionnaireData: UploadCoachFileQuestionnaireDto;
  },
  ThunkApiConfig
>(
  'data/uploadCoachFileQuestionnaire',
  async (
    { questionnaireId, questionnaireData },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const url = APIRoute.UploadCoachFileQuestionnaire.replace(
        ':questionnaireId',
        questionnaireId,
      );

      const { data } = await api.post<QuestionnaireDto>(
        url,
        questionnaireData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

export const deleteCoachFileQuestionnaire = createAsyncThunk<
  QuestionnaireDto,
  {
    questionnaireId: string;
    fileId: string;
  },
  ThunkApiConfig
>(
  'data/deleteCoachFileQuestionnaire',
  async ({ questionnaireId, fileId }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.DeleteCoachFileQuestionnaire.replace(
        ':questionnaireId',
        questionnaireId,
      ).replace(':fileId', fileId);

      const { data } = await api.delete<QuestionnaireDto>(url);

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
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

export const updateTraining = createAsyncThunk<
  TrainingDto,
  {
    trainingId: string;
    trainingData: UpdateTrainingDto;
  },
  ThunkApiConfig
>(
  'data/updateTraining',
  async ({ trainingId, trainingData }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.UpdateTraining.replace(':trainingId', trainingId);

      const { data } = await api.patch<TrainingDto>(url, trainingData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const fetchTraining = createAsyncThunk<
  TrainingPaginationDto,
  TrainingQuery | undefined,
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

export const fetchCoachTraining = createAsyncThunk<
  TrainingPaginationDto,
  string,
  ThunkApiConfig
>(
  'data/fetchCoachTraining',
  async (coachId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<TrainingPaginationDto>(
        APIRoute.GetTrainingList,
        { params: { coachId: coachId } },
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

export const fetchTrainingFouYou = createAsyncThunk<
  TrainingPaginationDto,
  undefined,
  ThunkApiConfig
>('data/fetchTrainingFouYou', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<TrainingPaginationDto>(
      APIRoute.GetTrainingFouYouList,
    );

    return data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchTrainingSpecialPrice = createAsyncThunk<
  TrainingPaginationDto,
  undefined,
  ThunkApiConfig
>(
  'data/fetchTrainingSpecialPrice',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<TrainingPaginationDto>(
        APIRoute.GetTrainingSpecialPrice,
      );

      return data;
    } catch (error) {
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

export const fetchMyOrder = createAsyncThunk<
  MyOrderPaginationDto,
  MyOrderQuery,
  ThunkApiConfig
>(
  'data/fetchMyOrder',
  async (myOrderQuery, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<MyOrderPaginationDto>(
        APIRoute.GetMyOrder,
        { params: myOrderQuery },
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

export const fetchBalances = createAsyncThunk<
  BalanceDto[],
  undefined,
  ThunkApiConfig
>('data/fetchBalances', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<BalanceDto[]>(APIRoute.GetBalances);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const activateBalancePurchase = createAsyncThunk<
  BalanceDto[],
  string,
  ThunkApiConfig
>(
  'data/activateBalancePurchase',
  async (balanceId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.ActivateBalancePurchase.replace(
        ':balanceId',
        balanceId,
      );
      const { data } = await api.post<BalanceDto[]>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deactivateBalancePurchase = createAsyncThunk<
  BalanceDto[],
  string,
  ThunkApiConfig
>(
  'data/deactivateBalancePurchase',
  async (balanceId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.DeactivateBalancePurchase.replace(
        ':balanceId',
        balanceId,
      );
      const { data } = await api.delete<BalanceDto[]>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const fetchUserDetail = createAsyncThunk<
  UserDto,
  undefined,
  ThunkApiConfig
>('data/fetchUserDetail', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<UserDto>(APIRoute.GetUser);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchPublicUserDetail = createAsyncThunk<
  PublicUserDto,
  string,
  ThunkApiConfig
>(
  'data/fetchPublicUserDetail',
  async (publicUserId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.GetPublicUserDetail.replace(
        ':publicUserId',
        publicUserId,
      );
      const { data } = await api.get<PublicUserDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const subscribeCoach = createAsyncThunk<
  PublicUserDto,
  string,
  ThunkApiConfig
>(
  'data/subscribeCoach',
  async (publicUserId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.SubscribeCoach.replace(
        ':publicUserId',
        publicUserId,
      );
      const { data } = await api.post<PublicUserDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const unsubscribeCoach = createAsyncThunk<
  PublicUserDto,
  string,
  ThunkApiConfig
>(
  'data/unsubscribeCoach',
  async (publicUserId, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.UnsubscribeCoach.replace(
        ':publicUserId',
        publicUserId,
      );
      const { data } = await api.delete<PublicUserDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

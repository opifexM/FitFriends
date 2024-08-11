import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { TokenPayload } from 'shared/type/token-payload.interface.ts';
import { CreateUserDto } from 'shared/type/user/dto/create-user.dto.ts';
import { LoggedDto } from 'shared/type/user/dto/logged.dto.ts';
import { LoginDto } from 'shared/type/user/dto/login.dto.ts';
import { UpdateUserDto } from 'shared/type/user/dto/update-user.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../../services/api/api-error-handler.ts';
import { ThunkApiConfig } from '../state.ts';

export const checkAuth = createAsyncThunk<
  TokenPayload,
  undefined,
  ThunkApiConfig
>('user/checkAuth', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<TokenPayload>(APIRoute.CheckAuth);

    return data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const loginAuth = createAsyncThunk<LoggedDto, LoginDto, ThunkApiConfig>(
  'user/loginAuth',
  async ({ email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<LoggedDto>(APIRoute.Login, {
        email,
        password,
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

export const registerAuth = createAsyncThunk<
  UserDto,
  CreateUserDto,
  ThunkApiConfig
>(
  'user/registerAuth',
  async (trainingData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserDto>(
        APIRoute.CreateUser,
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

export const updateUser = createAsyncThunk<
  UserDto,
  UpdateUserDto,
  ThunkApiConfig
>('user/updateUser', async (userData, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.patch<UserDto>(APIRoute.UpdateUser, userData, {
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
});

export const fetchUser = createAsyncThunk<UserDto, undefined, ThunkApiConfig>(
  'user/fetchUser',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.patch<UserDto>(APIRoute.GetUser);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right',
      });
      return rejectWithValue(handleApiError(error));
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { TokenPayload } from 'shared/type/token-payload.interface.ts';
import { Token } from 'shared/type/token.interface.ts';
import { CreateUserDto } from 'shared/type/user/dto/create-user.dto.ts';
import { LoggedDto } from 'shared/type/user/dto/logged.dto.ts';
import { LoginDto } from 'shared/type/user/dto/login.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../services/api-error-handler.ts';
import { ThunkApiConfig } from '../state.ts';

export const checkAuthAction = createAsyncThunk<
  TokenPayload,
  undefined,
  ThunkApiConfig
>('user/checkAuthAction', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<TokenPayload>(APIRoute.CheckAuth);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

//todo refresh token
export const refreshAuthAction = createAsyncThunk<
  Token,
  undefined,
  ThunkApiConfig
>('user/refreshAuthAction', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<Token>(APIRoute.RefreshAuth);

    return data;
  } catch (error) {
    toast.warning(handleApiError(error), {
      position: 'top-right',
    });
    return rejectWithValue(handleApiError(error));
  }
});

export const loginAction = createAsyncThunk<
  LoggedDto,
  LoginDto,
  ThunkApiConfig
>(
  'user/loginAction',
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

export const registerAction = createAsyncThunk<
  UserDto,
  CreateUserDto,
  ThunkApiConfig
>(
  'user/registerAction',
  async (
    {
      email,
      password,
      name,
      role,
      profilePictureId,
      description,
      gender,
      dateOfBirth,
      avatarId,
      location,
    },
    { extra: api, rejectWithValue },
  ) => {
    try {
      const { data } = await api.post<UserDto>(APIRoute.CreateUser, {
        email,
        name,
        password,
        role,
        profilePictureId,
        description,
        gender,
        dateOfBirth,
        avatarId,
        location,
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

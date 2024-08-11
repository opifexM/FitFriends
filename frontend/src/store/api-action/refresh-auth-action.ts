import { createAsyncThunk } from '@reduxjs/toolkit';
import { Token } from 'shared/type/token.interface.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../../services/api/api-error-handler.ts';
import { refreshApi } from '../../services/api/api.ts';
import { ThunkApiConfig } from '../state.ts';

export const refreshAuth = createAsyncThunk<Token, undefined, ThunkApiConfig>(
  'user/refreshAuth',
  async (_arg, { rejectWithValue }) => {
    try {
      const api = refreshApi();
      const { data } = await api.post<Token>(APIRoute.RefreshAuth);

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

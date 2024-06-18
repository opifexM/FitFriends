import { createSlice } from '@reduxjs/toolkit';
import {
  AUTH_ACCESS_TOKEN_KEY_NAME,
  AUTH_REFRESH_TOKEN_KEY_NAME,
  AuthorizationStatus,
  AuthorizationStatusType,
  NameSpace,
} from '../../const.ts';
import {
  checkAuthAction,
  loginAction,
  refreshAuthAction,
  registerAction,
} from '../api-action/user-auth-action.ts';
import { dropToken, saveToken } from '../services/token.ts';

interface ApiCommunicationState {
  isLoading: boolean;
  userName: string;
  userLogin: string;
  userId: string;
  authorizationStatus: AuthorizationStatusType;
}

const initialState: ApiCommunicationState = {
  isLoading: false,
  userName: '',
  userLogin: '',
  userId: '',
  authorizationStatus: AuthorizationStatus.Unknown,
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
        dropToken(AUTH_ACCESS_TOKEN_KEY_NAME);
        dropToken(AUTH_REFRESH_TOKEN_KEY_NAME);
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
        dropToken(AUTH_ACCESS_TOKEN_KEY_NAME);
        dropToken(AUTH_REFRESH_TOKEN_KEY_NAME);
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
        saveToken(AUTH_ACCESS_TOKEN_KEY_NAME, accessToken);
        saveToken(AUTH_REFRESH_TOKEN_KEY_NAME, refreshToken);
        state.userLogin = email;
        state.userId = id;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        dropToken(AUTH_ACCESS_TOKEN_KEY_NAME);
        dropToken(AUTH_REFRESH_TOKEN_KEY_NAME);
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
        dropToken(AUTH_ACCESS_TOKEN_KEY_NAME);
        dropToken(AUTH_REFRESH_TOKEN_KEY_NAME);
        state.userLogin = '';
        state.userName = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(refreshAuthAction.fulfilled, (state, action) => {
        const { refreshToken, accessToken } = action.payload;
        saveToken(AUTH_ACCESS_TOKEN_KEY_NAME, accessToken);
        saveToken(AUTH_REFRESH_TOKEN_KEY_NAME, refreshToken);
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      });
  },
});

export const { resetAuthStatus } = apiCommunicationSlice.actions;

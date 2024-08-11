import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN, BACKEND } from '../../const.ts';
import { store } from '../../store';
import { refreshAuth } from '../../store/api-action/refresh-auth-action.ts';
import { getToken, isTokenAboutToExpire } from '../token.ts';

let refreshTokenPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  try {
    await store.dispatch(refreshAuth()).unwrap();
  } finally {
    refreshTokenPromise = null;
  }
};

const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string | null,
) => {
  if (config.headers && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
};

const handleRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  let accessToken = getToken(AUTH_TOKEN.ACCESS_KEY);

  if (accessToken && isTokenAboutToExpire(accessToken)) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshAccessToken();
    }

    await refreshTokenPromise;
    accessToken = getToken(AUTH_TOKEN.ACCESS_KEY);
  }

  setAuthorizationHeader(config, accessToken);

  return config;
};

export function accessAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND.URL,
    timeout: BACKEND.REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(handleRequest);

  return api;
}

export function refreshApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND.URL,
    timeout: BACKEND.REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    setAuthorizationHeader(config, getToken(AUTH_TOKEN.REFRESH_KEY));
    return config;
  });

  return api;
}

import axios, { AxiosInstance } from 'axios';
import {
  AUTH_ACCESS_TOKEN_KEY_NAME,
  BACKEND_REQUEST_TIMEOUT,
  BACKEND_URL,
} from '../../const.ts';
import { getToken } from './token.ts';

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: BACKEND_REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken(AUTH_ACCESS_TOKEN_KEY_NAME);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}

export { createAPI };

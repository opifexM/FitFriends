import axios, { AxiosInstance } from 'axios';
import { AUTH_TOKEN, BACKEND } from '../const.ts';
import { getToken } from './token.ts';

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND.URL,
    timeout: BACKEND.REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken(AUTH_TOKEN.ACCESS_KEY);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}

export { createAPI };

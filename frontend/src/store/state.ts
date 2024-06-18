import { AxiosInstance } from 'axios';
import { store } from './index.ts';

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export interface ThunkApiConfig {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

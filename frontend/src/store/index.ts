import { configureStore } from '@reduxjs/toolkit';
import { accessAPI } from '../services/api/api.ts';
import { rootReducer } from './root-reducer.ts';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: accessAPI(),
      },
    }),
});

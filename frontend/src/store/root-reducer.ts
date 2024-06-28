import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { apiCommunicationSlice } from './api-communication/api-communication.slice.ts';
import { uiSettingsSlice } from './ui-settings/ui-settings.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.ApiCommunication]: apiCommunicationSlice.reducer,
  [NameSpace.UiSetting]: uiSettingsSlice.reducer,
});

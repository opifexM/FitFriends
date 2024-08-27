import { NameSpace } from '../../const.ts';
import { State } from '../state.ts';

export const getTrainingFilter = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].trainingFilter;

export const getPurchaseFilter = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].purchaseFilter;

export const getMyOrderFilter = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].myOrderFilter;

export const getIsPurchasePopupOpen = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].isPurchasePopupOpen;

export const getIsReviewCreatePopupOpen = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].isReviewCreatePopupOpen;

export const getIsQuestionnaireOpen = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].isQuestionnaireOpen;

export const getIsCertificateViewOpen = (
  state: Pick<State, typeof NameSpace.UiSetting>,
) => state[NameSpace.UiSetting].isCertificateViewOpen;

export const getMenuStatus = (state: Pick<State, typeof NameSpace.UiSetting>) =>
  state[NameSpace.UiSetting].menuStatus;

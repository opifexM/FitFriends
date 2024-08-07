import { NameSpace } from '../../const.ts';
import { State } from '../state.ts';

export const getIsLoading = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].isLoading;

export const getAuthorizationStatus = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].authorizationStatus;

export const getLastQuestionnaire = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].lastQuestionnaire;

export const getTrainings = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].trainings;

export const getTrainingsForYou = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].trainingsForYou;

export const getCurrentTraining = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].currentTraining;

export const getReviews = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].reviews;

export const getLastReview = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].lastReview;

export const getPurchases = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].purchases;

export const getUserDetail = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].userDetail;

export const getBalances = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].balances;

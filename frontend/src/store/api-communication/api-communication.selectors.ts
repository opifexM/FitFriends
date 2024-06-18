import { NameSpace } from '../../const.ts';
import { State } from '../state.ts';

export const getIsLoading = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].isLoading;

export const getAuthorizationStatus = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].authorizationStatus;

export const getUserName = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].userName;

export const getUserLogin = (
  state: Pick<State, typeof NameSpace.ApiCommunication>,
) => state[NameSpace.ApiCommunication].userLogin;

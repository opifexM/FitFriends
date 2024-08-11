import { AUTH_TOKEN } from '../const.ts';
import { dropCookie, getCookie, saveCookie } from './cookie.ts';

const MINUTES_IN_HOUR = 60;
const TIME_MC = 1000;

export function getToken(key: string): string {
  return getCookie(key);
}

export function saveToken(key: string, token: string = ''): void {
  saveCookie(key, token);
}

export function dropToken(key: string): void {
  dropCookie(key);
}

export function isTokenAboutToExpire(token: string): boolean {
  try {
    const payload: { exp?: number } = JSON.parse(atob(token.split('.')[1]));
    if (typeof payload.exp !== 'number') {
      return true;
    }
    const bufferTime =
      AUTH_TOKEN.REFRESH_BEFORE_MIN * MINUTES_IN_HOUR * TIME_MC;

    return Date.now() >= payload.exp * TIME_MC - bufferTime;
  } catch (error) {
    return true;
  }
}

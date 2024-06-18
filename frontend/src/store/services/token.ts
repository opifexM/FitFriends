import { dropCookie, getCookie, saveCookie } from './cookie.ts';

function getToken(key: string): string {
  return getCookie(key);
}

function saveToken(key: string, token: string = ''): void {
  saveCookie(key, token);
}

function dropToken(key: string): void {
  dropCookie(key);
}

export { getToken, saveToken, dropToken };

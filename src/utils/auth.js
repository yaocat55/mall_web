import Cookies from 'js-cookie';

const TokenKey = 'SUSAN-TOEKN';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, rememberMe) {
  return Cookies.set(TokenKey, token, rememberMe ? { expires: 1 } : undefined);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

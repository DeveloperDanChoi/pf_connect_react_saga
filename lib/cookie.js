import Cookies from 'universal-cookie';
import getConfig from 'next/config';

import { STORAGE_PREFIX, MAINTAIL_LOGIN_DAYS } from '../constants/value';

const TOKEN_TYPE = 'token_type';
export const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const SHOULD_AUTO_SIGN_IN = 'should_auto_sign_in';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export const COOKIE_KEY = {
  TOKEN_TYPE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SHOULD_AUTO_SIGN_IN,
};
const DOMAIN = BASE_URL;

const cookies = new Cookies();

// eslint-disable-next-line no-underscore-dangle
const _getAll = () => cookies.getAll();
// eslint-disable-next-line no-underscore-dangle
const _get = (key) => cookies.get(`${STORAGE_PREFIX}${key}`);
// eslint-disable-next-line no-underscore-dangle
const _set = (key, value, options) => {
  cookies.set(`${STORAGE_PREFIX}${key}`, value, options);
};
// eslint-disable-next-line no-underscore-dangle
const _setTokens = (data) => {
  const cookieOption = {
    path: '/',
    domain: DOMAIN,
  };
  // 로그인 유지 시 30일 셋팅
  if (typeof data.maintainLogin === 'boolean') {
    if (data.maintainLogin) {
      cookieOption.maxAge = MAINTAIL_LOGIN_DAYS;
    }

    _set(SHOULD_AUTO_SIGN_IN, data.maintainLogin, cookieOption);
  }
  _set(TOKEN_TYPE, data.token_type, cookieOption);
  _set(ACCESS_TOKEN, data.access_token, cookieOption);
  _set(REFRESH_TOKEN, data.refresh_token, cookieOption);
};

// eslint-disable-next-line no-underscore-dangle,max-len
const _checkJandiCookie = (targetStr, searchStr) => targetStr.substr(0, searchStr.length) === searchStr;

// eslint-disable-next-line no-underscore-dangle
const _removeCookie = (key, options = { path: '/', domain: DOMAIN }) => {
  if (_checkJandiCookie(key, STORAGE_PREFIX)) {
    cookies.remove(key, options);
  }
};

// eslint-disable-next-line no-underscore-dangle
const _removeAllCookies = () => {
  Object.keys(cookies.getAll()).forEach((key) => _removeCookie(key));
};

export const setTokens = _setTokens;
export const removeCookie = _removeCookie;
export const clearCookie = _removeAllCookies;
export const getCookie = _get;
export const getAllCookies = _getAll;
export const hasAccessToken = () => !!_get(ACCESS_TOKEN);
export const getAccessToken = () => _get(ACCESS_TOKEN);
export const getRefreshToken = () => _get(REFRESH_TOKEN);
export const isAutoSignIn = () => {
  const autoCookie = _get(SHOULD_AUTO_SIGN_IN);
  return autoCookie && autoCookie === 'true';
};

export const getFacebookIds = () => {
  const data = {
    fbp: cookies.get('_fbp'),
    fbc: cookies.get('_fbc'),
  };
  // eslint-disable-next-line no-unused-expressions
  !data.fbc && delete data.fbc;
  // eslint-disable-next-line no-unused-expressions
  !data.fbp && delete data.fbp;

  return data;
};

export default {};

import getConfig from 'next/config';
import isMobile from 'ismobilejs';

import { STORAGE_PREFIX } from '../../constants/value';
import PATH from '../../constants/path';

import { COOKIE_KEY, ACCESS_TOKEN } from '../cookie';

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

const accessTokenKey = `${STORAGE_PREFIX}${ACCESS_TOKEN}`;

const ServerSideHelper = {
  redirect: (res, path) => {
    res.setHeader('Location', path);
    res.statusCode = 302;

    res.end();
  },
  // eslint-disable-next-line no-prototype-builtins
  hasAccessToken: (req) => req?.cookies.hasOwnProperty(accessTokenKey),
  getAccessToken: (req) => req?.cookies[accessTokenKey],
  clearCookie: (ctx) => {
    const { req, res } = ctx;
    const cookies = req?.cookies;

    const cookieInfo = [];

    Object.keys(cookies).forEach((key) => {
      if (key.match(STORAGE_PREFIX)) {
        cookieInfo.push(
          `${key}=; max-age=0; path=${PATH.ROOT_PATH}; domain=${BASE_URL};`,
        );
      }
    });

    res.setHeader('Set-Cookie', cookieInfo);
  },
  setTokens: (ctx, data) => {
    const { res } = ctx;
    // const { req, res } = ctx;
    // const cookies = req?.cookies;
    const cookieInfo = Object.values(COOKIE_KEY)
      .filter((key) => data[key])
      .map(
        (key) => `${STORAGE_PREFIX}${key}=${data[key]}; path=${PATH.ROOT_PATH}; domain=${BASE_URL};`,
      );

    res.setHeader('Set-Cookie', cookieInfo);
  },
  isMobile: (req) => isMobile(req?.headers['user-agent']).any,
};

export default ServerSideHelper;

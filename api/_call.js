// import getConfig from 'next/config';
import axios from 'axios';

import { getAccessToken } from '../lib/cookie';
import ServerSideHelper from '../lib/helpers/serverSideHelper';

import { config } from '../lib/config';

// const { publicRuntimeConfig } = getConfig();
// const { API_URL, WEB_URL } = publicRuntimeConfig;

const { getAccessToken: getAccessTokenFromServer } = ServerSideHelper;

/**
 * TODO: call2로 교체
 * @deprecated
 * @param target
 * @param method
 * @param uri
 * @param headersInfo
 * @param data
 * @returns
 */
const call = (target, method, uri, headersInfo, data = null) => {
  const setUrl = () => {
    const url = target === 'web' ? config.getConfig().WEB_URL : config.getConfig().API_URL;
    return `${url}${uri}`;
  };

  const setHeaders = () => {
    const { version, req } = headersInfo;
    const accessToken = req ? getAccessTokenFromServer(req) : getAccessToken();

    const accept = `application/vnd.tosslab.jandi-v${version}+json`;
    const authorization = `bearer ${accessToken}`;

    return {
      'content-type': target !== 'upload' ? 'application/json;charset=UTF-8' : 'multipart/form-data;',
      accept,
      authorization,
    };
  };

  const url = setUrl();
  const headers = setHeaders();

  if (headersInfo?.responseType === 'arraybuffer') {
    return axios.get(url, {
      headers,
      responseType: headersInfo.responseType,
    });
  }

  switch (method) {
    case 'get': {
      return axios.get(url, {
        headers,
      }).catch((err) => err.response);
    }
    case 'post': {
      return axios.post(url, data, {
        headers,
      }).catch((err) => err.response);
    }
    case 'put': {
      return axios.put(url, data, {
        headers,
      }).catch((err) => err.response);
    }
    case 'delete': {
      return axios.delete(url, {
        data,
        headers,
      }).catch((err) => err.response);
    }
    default: {
      console.error('error');
    }
  }

  return undefined;
};
const call2 = (target, method, uri, headersInfo, data = null) => {
  const setUrl = () => {
    const url = config.getConfig()[target];
    return `${url}${uri}`;
  };

  const setHeaders = () => {
    const { version, req } = headersInfo;
    const accessToken = req ? getAccessTokenFromServer(req) : getAccessToken();

    const accept = `application/vnd.tosslab.jandi-v${version}+json`;
    const authorization = `bearer ${accessToken}`;

    return {
      'content-type': target !== 'upload' ? 'application/json;charset=UTF-8' : 'multipart/form-data;',
      accept,
      authorization,
    };
  };

  const url = setUrl();
  const headers = setHeaders();

  if (headersInfo?.responseType === 'arraybuffer') {
    return axios.get(url, {
      headers,
      responseType: headersInfo.responseType,
    });
  }

  switch (method) {
    case 'get': {
      return axios.get(url, {
        headers,
      }).catch((err) => err.response);
    }
    case 'post': {
      return axios.post(url, data, {
        headers,
      }).catch((err) => err.response);
    }
    case 'put': {
      return axios.put(url, data, {
        headers,
      }).catch((err) => err.response);
    }
    case 'delete': {
      return axios.delete(url, {
        data,
        headers,
      }).catch((err) => err.response);
    }
    default: {
      console.error('error');
    }
  }

  return undefined;
};

export const api = {
  get: (uri, headersInfo) => call('api', 'get', uri, headersInfo),
  post: (uri, data, headersInfo) => call('api', 'post', uri, headersInfo, data),
  put: (uri, data, headersInfo) => call('api', 'put', uri, headersInfo, data),
  delete: (uri, data, headersInfo) => call('api', 'delete', uri, headersInfo, data),
};

// eslint-disable-next-line camelcase
export const connect_api = {
  get: (uri, headersInfo) => call2('CONNECT_API_URL', 'get', uri, headersInfo),
  post: (uri, data, headersInfo) => call2('CONNECT_API_URL', 'post', uri, headersInfo, data),
  put: (uri, data, headersInfo) => call2('CONNECT_API_URL', 'put', uri, headersInfo, data),
  delete: (uri, data, headersInfo) => call2('CONNECT_API_URL', 'delete', uri, headersInfo, data),
};

export const web = {
  get: (uri, data, headersInfo) => call('web', 'get', uri, headersInfo),
  post: (uri, data, headersInfo) => call('web', 'post', uri, headersInfo, data),
};

export const upload = {
  put: (uri, data, headersInfo) => call('upload', 'put', uri, headersInfo, data),
  post: (uri, data, headersInfo) => call('upload', 'post', uri, headersInfo, data),
};

export const l10n = {
  get: (uri, headersInfo) => call2('L10N_URL', 'get', uri, headersInfo),
};

export default {};

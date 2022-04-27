// import getConfig from 'next/config';
import axios from 'axios';

import { getAccessToken } from 'lib/cookie';
import ServerSideHelper from 'lib/helpers/serverSideHelper';

import { config } from '../lib/config';

// const { publicRuntimeConfig } = getConfig();
// const { API_URL, WEB_URL } = publicRuntimeConfig;

const { getAccessToken: getAccessTokenFromServer } = ServerSideHelper;

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
      responseType: headersInfo.responseType
    });
  }

  switch (method) {
    case 'get': {
      return axios.get(url, {
        headers,
      });
    }
    case 'post': {
      return axios.post(url, data, {
        headers,
      });
    }
    case 'put': {
      return axios.put(url, data, {
        headers,
      });
    }
    case 'delete': {
      return axios.delete(url, {
        data,
        headers,
      });
    }
    default: {
      console.error('error');
    }
  }
};

export const api = {
  get: (uri, headersInfo) => call('api', 'get', uri, headersInfo),
  post: (uri, data, headersInfo) => call('api', 'post', uri, headersInfo, data),
  put: (uri, data, headersInfo) => call('api', 'put', uri, headersInfo, data),
  delete: (uri, data, headersInfo) => call('api', 'delete', uri, headersInfo, data),
};

export const web = {
  get: (uri, data, headersInfo) => call('web', 'get', uri, headersInfo),
  post: (uri, data, headersInfo) => call('web', 'post', uri, headersInfo, data),
};

export const upload = {
  put: (uri, data, headersInfo) => call('upload', 'put', uri, headersInfo, data),
};

export default {};

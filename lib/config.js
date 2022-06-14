import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const {
  API_URL,
  WEB_URL,
  // eslint-disable-next-line camelcase
  socket_address,
  L10N_URL,
  CONNECT_API_URL,
} = publicRuntimeConfig;

// eslint-disable-next-line no-underscore-dangle
const _config = () => {
  const configValue = {
    API_URL: '',
    socket_address: '',
    WEB_URL: '',
    L10N_URL: '',
    CONNECT_API_URL: '',
  };
  const setConfig = (config) => {
    if (config) {
      configValue.API_URL = config.api_address;
      configValue.socket_address = config.socket_address;
    } else {
      configValue.API_URL = API_URL;
      // eslint-disable-next-line camelcase
      configValue.socket_address = socket_address;
    }
    configValue.WEB_URL = WEB_URL;
    configValue.L10N_URL = L10N_URL;
    configValue.CONNECT_API_URL = CONNECT_API_URL;
  };
  // eslint-disable-next-line no-shadow
  const getConfig = () => configValue;
  return {
    setConfig,
    getConfig,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const config = _config();

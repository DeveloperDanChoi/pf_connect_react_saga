import getConfig from 'next/config';

// eslint-disable-next-line import/prefer-default-export
export const JndVersion = (function () {
  const configuration = getConfig().publicRuntimeConfig;
  const { version } = configuration;
  const { name } = configuration;
  const isLocal = name === 'local';
  const isDev = name === 'development';
  const isStaging = name === 'staging';
  const isLocalOrDev = isLocal || isDev;
  // eslint-disable-next-line no-bitwise
  const isAlpha = isStaging && !!~version.indexOf('-alpha.');
  const isLive = isStaging && !isAlpha;

  return {
    version,
    name,
    isLocal,
    isDev,
    isStaging,
    isLocalOrDev,
    isAlpha,
    isLive,
  };
}());

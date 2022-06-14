/* eslint-disable no-nested-ternary */
const Dotenv = require('dotenv-webpack');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';
const isAlpha = process.env.NODE_ENV === 'alpha';
const isDev = process.env.NODE_ENV === 'development';
const isLocal = process.env.ISLOCAL === 'true';
const isGcp = process.env.NODE_ENV === 'oprs';
// const basePath = '/connect/app';
const basePath = '/connect';
const getAddress = (data) => data[process.env.NODE_ENV];
const getAddress2 = (data) => data[isLocal ? 'local' : process.env.NODE_ENV];
const publicRuntimeConfig = {
  API_URL: getAddress({
    production: 'https://i1.jandi.com',
    alpha: 'https://i1.a-jandi.com',
    development: 'https://i1.jandi.io',
    oprs: 'https://i1.gamevilcom2us.net',
  }),
  CONNECT_API_URL: getAddress({
    production: 'http://local.jandi.io:8080',
    alpha: 'http://local.jandi.io:8080',
    development: 'http://local.jandi.io:8080',
    oprs: 'http://local.jandi.io:8080',
  }),
  WEB_URL: getAddress({
    production: 'https://www.jandi.com',
    alpha: 'https://www.jandi.com',
    development: 'https://www.jandi.io',
    oprs: 'https://www.gamevilcom2us.net',
  }),
  TEAM_LIST_URL: getAddress({
    production: 'https://www.jandi.com/main/#/',
    alpha: 'https://www.jandi.com/main/#/',
    development: 'https://www.jandi.io/main/#/',
    oprs: 'https://www.gamevilcom2us.net/',
  }),
  BASE_URL: getAddress({
    production: 'jandi.com',
    alpha: 'jandi.com',
    development: 'jandi.io',
    oprs: 'gamevilcom2us.net',
  }),
  DEFAULT_IMG_URL: getAddress2({
    production: 'https://cdn.jandi.com',
    alpha: 'https://alpha-cdn.jandi.com',
    development: 'https://cdn.jandi.io',
    oprs: 'https://www.gamevilcom2us.net',
    local: 'https://cdn.jandi.io'
  }),
  ASSET_DIR: getAddress2({
    production: 'https://cdn.jandi.com/admin',
    alpha: 'https://alpha-cdn.jandi.com/admin',
    development: 'https://cdn.jandi.io/admin',
    oprs: 'https://www.gamevilcom2us.net/admin',
    local: '',
  }),
  BASE_PATH: basePath,
  L10N_URL: getAddress({
    production: 'https://cdn.jandi.com',
    alpha: 'https://alpha-cdn.jandi.com',
    development: 'https://cdn.jandi.io',
    oprs: 'https://cdn.gamevilcom2us.net',
  }),
  LOCAL_SITE_OWNER: process.env.LOCAL_SITE_OWNER || '',
  socket_address: getAddress({
    production: 'https://ws.jandi.com/',
    alpha: 'https://ws.jandi.com/',
    development: 'https://ws.jandi.io/',
    oprs: 'https://ws.gamevilcom2us.net/',
  }),
  version: process.env.VERSION,
  ENV_NAME: getAddress2({
    production: '',
    alpha: 'Alp',
    development: 'Dev',
    oprs: 'Oprs',
    local: 'Loc',
  }),
  isGcp,
  /**
   * @deprecated
   */
  dev: process.env.NODE_ENV === 'development' ? process.env : {}
};

const nextConfig = {
  basePath,
  assetPrefix: publicRuntimeConfig.ASSET_DIR,
  dynamicAssetPrefix: true,
  distDir: '_next',
  publicRuntimeConfig,
  images: {
    disableStaticImages: true,
  },
  // reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/connect",
  //       destination: "/app",
  //       permanent: false,
  //     },
  //   ];
  // },

  webpack: (config) => {
    // Link dotenv to webpack
    // silent:  .env 없을 때 에러 낼지 말지
    config.plugins.push(new Dotenv({ silent: true }));

    if (isProd && config.optimization.splitChunks && config.optimization.splitChunks.cacheGroups) {
      const cacheGroups = config.optimization.splitChunks.cacheGroups
      if (cacheGroups && cacheGroups.lib) {
        cacheGroups.lib = Object.assign({}, cacheGroups.lib, {
          enforce: true
        });
      }
      if (cacheGroups && cacheGroups.lib) {
        cacheGroups.commons = Object.assign({}, cacheGroups.commons, {
          enforce: true
        });
      }
    }

    return {
      ...config,
      mode: isProd || isGcp ? 'production' : 'development',
      devtool: isProd || isGcp ? 'hidden-source-map' : 'eval',
    };
  },

  generateBuildId: async () => `${process.env.NODE_ENV}-${process.env.APP_VERSION}`,

};

module.exports = withPlugins([[withImages], [withBundleAnalyzer]], nextConfig);

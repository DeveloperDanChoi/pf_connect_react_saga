import _ from 'lodash';

const DEFAULT_LANGUAGE = 'kr';

export const SERVICE_LANGUAGE = [
  'kr',
  'ja',
  'en',
  'zh-tw',
  'zh-cn',
  'vi',
];
// eslint-disable-next-line max-len
export const getServiceLanguage = (data) => (_.includes(SERVICE_LANGUAGE, data) ? data : DEFAULT_LANGUAGE);

export const LANGUAGE = {
  KOREAN: 'kr',
  ENGLISH: 'en',
  JAPANESE: 'jp',
  TAIWANESE: 'zh-tw',
  CHINESE: 'zh-cn',
  VIETNAMESE: 'vi',
};

export default {};

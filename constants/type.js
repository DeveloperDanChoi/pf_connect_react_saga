/* eslint-disable max-len */
import { util } from '../service/util';

const DEFAULT_LANGUAGE = 'kr';

export const SERVICE_LANGUAGE = [
  'kr',
  'ja',
  'en',
  'zh-tw',
  'zh-cn',
  'vi',
];
export const getServiceLanguage = (data) => (util.includes(SERVICE_LANGUAGE, data) ? data : DEFAULT_LANGUAGE);

export const LANGUAGE = {
  KOREAN: 'kr',
  ENGLISH: 'en',
  JAPANESE: 'jp',
  TAIWANESE: 'zh-tw',
  CHINESE: 'zh-cn',
  VIETNAMESE: 'vi',
};
export const LANGUAGE2 = {
  한국어: 'kr',
  English: 'en',
  日本語: 'jp',
  简体中文: 'zh-tw',
  繁體中文: 'zh-cn',
  'Tiếng Việt': 'vi',
};
export const LANGUAGE3 = {
  한국어: 'ko',
  English: 'en',
  日本語: 'jp',
  简体中文: 'zh-tw',
  繁體中文: 'zh-cn',
  'Tiếng Việt': 'vi',
};
export const LANGUAGE4 = {
  ko: '한국어',
  en: 'English',
  jp: '日本語',
  'zh-tw': '简体中文',
  'zh-ch': '繁體中文',
  vi: 'Tiếng Việt',
};

export default {};

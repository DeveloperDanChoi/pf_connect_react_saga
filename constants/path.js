import getConfig from 'next/config';

// FIXME: Server path에서 basePath가 필요한지 테스트 필요
const {
  publicRuntimeConfig: { BASE_URL, WEB_URL },
} = getConfig();

const catchAllDynamicURI = '/[...slug]';
const catchOptionalDynamicURI = '/[[...slug]]';
const linkDynamicURI = '/[link]';
const invitationCodeDynamicURI = '/[code]';
const invitationTokenDynamicURI = '/[token]';

// FIXME: 조금 더 고민이 필요함 전체적으로 routerPath와 asPath, 서버용 path를 합치고 싶음
const PATH = {
  ROOT_PATH: '/',
  ADMIN_DOMAIN: (teamId) => `https://admin.${BASE_URL}/${teamId}`,
  ADMIN_PAGE: `${WEB_URL}/main/#/`,
};

export const localeDynamicURI = '';
// FIXME: PATH 작업 필요
export const ROUTER_PATH = {
  HOME: '/',
  MAIN: `${localeDynamicURI}`,
  EXPIRED: `${localeDynamicURI}${linkDynamicURI}/expired`,
  COMPANY: `${localeDynamicURI}/company`,
  CONSULT: `${localeDynamicURI}/consult${catchOptionalDynamicURI}`,
  DOWNLOAD: `${localeDynamicURI}/download${catchOptionalDynamicURI}`,
  FEATURES: `${localeDynamicURI}/features`,
  INDUSTRY: `${localeDynamicURI}/industry${catchOptionalDynamicURI}`,
  INVITATION_CODE: `${localeDynamicURI}/invitationCode${invitationCodeDynamicURI}`,
  PASSWORD_RESET: `${localeDynamicURI}/passwordReset`,
  PRICING: `${localeDynamicURI}/pricing`,
  PRIVATE: `${localeDynamicURI}/private${catchAllDynamicURI}`,
  SECURITY: `${localeDynamicURI}/security`,
  SEED: `${localeDynamicURI}/seed${invitationTokenDynamicURI}`,
  SIGNIN: `${localeDynamicURI}/signin`,
  SIGNUP: `${localeDynamicURI}/signup`,
  SYSTEM_INSPECTION: `${localeDynamicURI}/systemInspection`,
  TERMS: `${localeDynamicURI}/terms${catchAllDynamicURI}`,
  AGREE_INFORMATION_PROTECTION: `${localeDynamicURI}/agree/information_protection`,
  AGREE_PERSONAL_INFORMATION: `${localeDynamicURI}/agree/personal_information`,
};

export const surveyUrl = {
  ko: 'https://tosslab.typeform.com/to/Xk94B2',
  ja: 'https://tosslab.typeform.com/to/uA6Hvi',
  en: 'https://tosslab.typeform.com/to/wUUvXJ',
  'zh-tw': 'https://tosslab.typeform.com/to/oOxBOX',
  'zh-cn': 'https://tosslab.typeform.com/to/lAYkIS',
  vi: 'https://tosslab.typeform.com/to/wUUvXJ',
};
export const helpUrl = {
  ko: 'https://support.jandi.com/hc/ko/articles/207499586-%EC%9E%94%EB%94%94-%EC%BB%A4%EB%84%A5%ED%8A%B8%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94-',
  ja: 'https://support.jandi.com/hc/ja/articles/115004542106-JANDI%E3%82%B3%E3%83%8D%E3%82%AF%E3%83%88%E3%81%A8%E3%81%AF%E3%81%AA%E3%82%93%E3%81%A7%E3%81%99%E3%81%8B-',
  en: 'https://support.jandi.com/hc/en-us/articles/210865903-Understanding-JANDI-Connect',
  'zh-tw': 'https://support.jandi.com/hc/zh-tw/articles/213392286-a-%E4%BB%80%E9%BA%BC%E6%98%AF-JANDI-Connect-',
  'zh-cn': 'https://support.jandi.com/hc/zh-tw/articles/213392286-a-%E4%BB%80%E9%BA%BC%E6%98%AF-JANDI-Connect-',
  vi: 'https://support.jandi.com/hc/en-us/articles/210865903-Understanding-JANDI-Connect',
};

export default PATH;

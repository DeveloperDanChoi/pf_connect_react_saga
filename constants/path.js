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
  ADMIN_PAGE: `${WEB_URL}/main/#/`
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

export default PATH;

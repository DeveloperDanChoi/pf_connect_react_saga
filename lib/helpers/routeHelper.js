import getConfig from 'next/config';
import _ from 'lodash';
import { hasAccessToken } from '../cookie';
import { getServiceLanguage } from '../../constants/type';
import { Storage } from '../../service/storage.service';

const { publicRuntimeConfig } = getConfig();
const {
  WEB_URL, TEAM_LIST_URL, ENV_NAME, isGcp,
} = publicRuntimeConfig;

/**
 * 메인 페이지로 이동해주는 함수.
 * 이때 window.location.replace인 이유는 아예 새 페이지로 넘어가게 하기 위해서
 * @returns {void}
 */
const redirectToTeamList = () => window.location.replace(`${TEAM_LIST_URL}`);
/**
 * 로그인 페이지로 이동해주는 함수.
 * 이때 window.location.replace인 이유는 아예 새 페이지로 넘어가게 하기 위해서
 * @returns {void}
 */
const redirectToLogin = () => {
  if (isGcp) {
    // eslint-disable-next-line no-restricted-globals
    window.location.replace(`https://signin.gamevilcom2us.net/auth/login?redirectUrl=${location.origin}`);
  } else {
    // eslint-disable-next-line no-restricted-globals
    window.location.replace(`${WEB_URL}/landing/${getServiceLanguage(Storage.get('last_lang'))}/signin?redirectUrl=${location.origin}`);
  }
};

/**
 * 토큰이 있을 경우 팀리스트
 * 토큰이 없을 경우 로그인
 */
// eslint-disable-next-line import/prefer-default-export
export const redirectToLoginAndList = () => {
  if (hasAccessToken()) {
    // redirectToTeamList();
  } else {
    redirectToLogin();
  }
};

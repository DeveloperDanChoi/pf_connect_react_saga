import { api } from '../_call';
/**
 * 인증된 사용자의 정보 조회<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1118536161/v3+GET+account<br>
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAccountV3 = () => api.get('/inner-api/account', { version: 3 });

export const getAccountMembersV2 = () => api.get('/inner-api/account/members/20128231', { version: 2 });
// export const getAccountMembersV2 = () => api.get('/inner-api/teams/279/members/20128231', { version: 3 });
/**
 * API List > Inner API > account
 */
export default {};

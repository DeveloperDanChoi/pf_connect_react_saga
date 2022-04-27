import { api } from '../_call';
/**
 * 인증된 사용자의 정보 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1106969394/v2+GET+account
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAccountV2 = () => api.get('/inner-api/account', { version: 2 });

/**
 * API List > Inner API > account
 */
export default {};

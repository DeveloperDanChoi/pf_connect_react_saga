import { api } from '../_call';
/**
 * Connect 공통 정보를 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817654/GET+connect-api+connect
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getConnect = () => api.get('/connect-api/connect', { version: 1 });
/**
 * 팀에 연결된 모든 Connect 정보를 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817586/GET+connect-api+teams+teamId+connect
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsConnect = (data) => api.get(`/connect-api/teams/${data}/connect`, { version: 1 });

/**
 * API List > Connect API > Web admin
 */
export default {};

import { api } from '../../_call';

/**
 * 외부에서 Connect에 값을 넘기기 위한 Webhook API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817387/POST+connect-api+webhook+teamId+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postWebhook = (data) => api.post(`/connect-api/webhook/${data.teamId}/${data.token}`, data.data, { version: 1 });

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
 * Webhook용 Token을 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817375/GET+connect-api+teams+teamId+connectType+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsToken = (data) => api.get(`/connect-api/teams/${data.teamId}/${data.connectType}/token`, { version: 1 });

/**
 * Webhook용 Token을 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344377/PUT+connect-api+teams+teamId+connectType+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsToken = (data) => api.put(`/connect-api/teams/${data.teamId}/${data.connectType}/token`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin
 */
export default {};

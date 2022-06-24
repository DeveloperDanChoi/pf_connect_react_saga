import { api } from '../../../_call';

/**
 * Incoming Webhook Connect 설정을 삭제하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817360/DELETE+connect-api+teams+teamId+incoming<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsIncoming = (data) => api.delete(`/connect-api/teams/${data.teamId}/incoming?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Incoming Webhook Connect 설정을 단일 조회하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817363/GET+connect-api+teams+teamId+incoming+connectId<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsIncoming = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/incoming/${params.connectId}`, { version: 1 });

/**
 * Incoming Webhook Connect 설정을 생성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817349/POST+connect-api+teams+teamId+incoming<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsIncoming = (data) => api.post(`/connect-api/teams/${data.teamId}/incoming`, data.data, { version: 2 });

/**
 * Incoming Webhook Connect 설정을 수정하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817356/PUT+connect-api+teams+teamId+incoming+setting<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsIncomingSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/incoming/setting`, body, { version: 1 });

/**
 * Incoming Webhook Connect 설정을 활성/비활성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817358/PUT+connect-api+teams+teamId+incoming+status<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsIncomingStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/incoming/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Incoming
 */
export default {};

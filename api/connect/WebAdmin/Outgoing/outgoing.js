import { api } from '../../../_call';

/**
 * Outgoing Webhook Connect 설정을 삭제하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344375/DELETE+connect-api+teams+teamId+outgoing<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsOutgoing = (data) => api.delete(`/connect-api/teams/${data.teamId}/outgoing?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Outgoing Webhook Connect 설정을 단일 조회하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344286/GET+connect-api+teams+teamId+outgoing+connectId<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsOutgoing = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/outgoing/${params.connectId}`, { version: 1 });

/**
 * Outgoing Webhook Connect 설정을 생성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120343337/POST+connect-api+teams+teamId+outgoing<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsOutgoing = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/outgoing`, body, { version: 1 });

/**
 * Outgoing Webhook Connect 설정을 수정하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344297/PUT+connect-api+teams+teamId+outgoing+setting<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsOutgoingSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/outgoing/setting`, body, { version: 1 });

/**
 * Outgoing Webhook Connect 설정을 활성/비활성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344366/PUT+connect-api+teams+teamId+outgoing+status<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsOutgoingStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/outgoing/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Outgoing
 */
export default {};

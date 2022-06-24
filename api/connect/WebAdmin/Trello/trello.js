import { api } from '../../../_call';

/**
 * Connect Trello Service 삭제<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817493/DELETE+connect-api+teams+teamId+trello<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsTrello = (data) => api.delete(`/connect-api/teams/${data.teamId}/trello?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Connect Trello Service 조회<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817511/GET+connect-api+teams+teamId+trello+connectId<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsTrello = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/trello/${params.connectId}`, { version: 1 });

/**
 * Connect Trello Service 생성<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817408/POST+connect-api+teams+teamId+trello<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsTrello = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/trello`, body, { version: 1 });

/**
 * Connect Trello Service 설정 변경<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817506/PUT+connect-api+teams+teamId+trello+setting<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsTrelloSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/trello/setting`, body, { version: 1 });

/**
 * Connect Trello Service 상태 변경<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817509/PUT+connect-api+teams+teamId+trello+status<br>
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsTrelloStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/trello/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Trello
 */
export default {};

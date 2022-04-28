import { api } from '../../../_call';

/**
 * Connect Trello Service 삭제
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817493/DELETE+connect-api+teams+teamId+trello
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsTrello = (data) => api.delete(`/connect-api/teams/${data.teamId}/trello`, data.data, { version: 1 });

/**
 * Connect Trello Service 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817511/GET+connect-api+teams+teamId+trello+connectId
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsTrello = (data) => api.get(`/connect-api/teams/${data.teamId}/trello/${data.connectId}`, { version: 1 });

/**
 * Connect Trello Service 생성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817408/POST+connect-api+teams+teamId+trello
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsTrello = (data) => api.post(`/connect-api/teams/${data.teamId}/trello`, data.data, { version: 1 });

/**
 * Connect Trello Service 설정 변경
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817506/PUT+connect-api+teams+teamId+trello+setting
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsTrelloSetting = (data) => api.put(`/connect-api/teams/${data.teamId}/trello/setting`, data.data, { version: 1 });

/**
 * Connect Trello Service 상태 변경
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817509/PUT+connect-api+teams+teamId+trello+status
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsTrelloStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/trello/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Trello
 */
export default {};

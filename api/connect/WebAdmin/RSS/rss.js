import { api } from '../../../_call';

/**
 * RSS Connect 설정을 삭제
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913404/DELETE+connect-api+teams+teamId+rss
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsRss = (data) => api.delete(`/connect-api/teams/${data.teamId}/rss`, data.data, { version: 1 });

/**
 * RSS Connect 설정 단일 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913402/GET+connect-api+teams+teamId+rss+connectId
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsRss = (data) => api.get(`/connect-api/teams/${data.teamId}/rss/${data.connectId}`, { version: 1 });

/**
 * RSS Connect 설정 생성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913356/POST+connect-api+teams+teamId+rss
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsRss = (data) => api.post(`/connect-api/teams/${data.teamId}/rss`, data.data, { version: 1 });

/**
 * RSS Connect 설정 수정
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913393/PUT+connect-api+teams+teamId+rss+setting
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsRssSetting = (data) => api.put(`/connect-api/teams/${data.teamId}/rss/setting`, data.data, { version: 1 });

/**
 * RSS Connect 활성/비활성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913398/PUT+connect-api+teams+teamId+rss+status
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsRssStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/rss/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > RSS
 */
export default {};

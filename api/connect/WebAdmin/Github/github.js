import { api } from '../../../_call';

/**
 * Github Connect 설정 삭제
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817420/DELETE+connect-api+teams+teamId+github
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsGithub = (data) => api.delete(`/connect-api/teams/${data.teamId}/github?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * 단일 Github Connect 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817475/GET+connect-api+teams+teamId+github+connectId
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsGithub = (data) => api.get(`/connect-api/teams/${data.teamId}/github/${data.connectId}`, { version: 1 });

/**
 * Github Connect 설정 생성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817448/POST+connect-api+teams+teamId+github
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsGithub = (data) => api.post(`/connect-api/teams/${data.teamId}/github`, data.data, { version: 1 });

/**
 * Github Connect 설정 수정
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817470/PUT+connect-api+teams+teamId+github+setting
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsGithubSetting = (data) => api.put(`/connect-api/teams/${data.teamId}/github/setting`, data.data, { version: 1 });

/**
 * Github Connect 상태 수정
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817473/PUT+connect-api+teams+teamId+github+status
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsGithubStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/github/status`, data.data, { version: 1 });

export const github = (() => ({
  deleteTeamsGithub,
  getTeamsGithub,
  postTeamsGithub,
  putTeamsGithubSetting,
  putTeamsGithubStatus,
}))();
/**
 * API List > Connect API > Web admin > Github
 */
export default {};

import { api } from '../../../_call';

/**
 * Bitbucket Connect 설정을 삭제하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117914001/DELETE+connect-api+teams+teamId+bitbucket
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteTeamsBitbucket = (data) => api.delete(`/connect-api/teams/${data.teamId}/bitbucket?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Bitbucket Connect 설정을 단일 조회하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117914003/GET+connect-api+teams+teamId+bitbucket+connectId
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsBitbucket = (data) => api.get(`/connect-api/teams/${data.teamId}/bitbucket/${data.connectId}`, { version: 1 });

/**
 * Bitbucket Connect 설정을 생성하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117914005/POST+connect-api+teams+teamId+bitbucket
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTeamsBitbucket = (data) => api.post(`/connect-api/teams/${data.teamId}/bitbucket`, data.data, { version: 1 });

/**
 * Bitbucket Connect 설정을 수정하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117914008/PUT+connect-api+teams+teamId+bitbucket+setting
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsBitbucketSetting = (data) => api.put(`/connect-api/teams/${data.teamId}/bitbucket/setting`, data.data, { version: 1 });

/**
 * Bitbucket Connect 설정을 활성/비활성하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117914010/PUT+connect-api+teams+teamId+bitbucket+status
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsBitbucketStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/bitbucket/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Bitbucket
 */
export default {};

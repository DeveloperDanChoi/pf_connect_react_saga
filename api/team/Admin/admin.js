import { api } from '../../_call';
/**
 * 해당팀에 public 토픽 + 로그인한 유저의 private 토픽<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2220786032/GET+team-api+v1+admin+teams+teamId+topics<br>
 * @param data
 * @returns {Promise<AxiosResponse<*>|void>|Promise<AxiosResponse<*>>}
 */
export const getV1AdminTeamsTopics = (data) => api.get(`/team-api/v1/admin/teams/${data}/topics`, { version: 1 });

/**
 * 팀 멤버의 목록 조회<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2219606166/GET+team-api+v1+admin+teams+teamId+members<br>
 * @param data
 * @returns {Promise<AxiosResponse<*>|void>|Promise<AxiosResponse<*>>}
 */
export const getV1AdminTeamsMembers = (data) => api.get(`/team-api/v1/admin/teams/${data}/members`, { version: 1 });

/**
 * 팀 정보 가져오기<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2219606063/GET+team-api+v1+admin+teams+teamId<br>
 * @param data
 * @returns {Promise<AxiosResponse<*>|void>|Promise<AxiosResponse<*>>}
 */
export const getV1AdminTeams = (data) => api.get(`/team-api/v1/admin/teams/${data}`, { version: 1 });

/**
 * err backend check<br>
 * @param data
 * @returns {Promise<AxiosResponse<*>|void>|Promise<AxiosResponse<*>>}
 */
export const getV1AdminTeamsMemberProfiles = (data) => api.get(`/team-api/v1/admin/teams/${data.teamId}/members/${data.memberId}/profiles`, { version: 1 });

/**
 * API List > Team API > Admin
 */
export default {};

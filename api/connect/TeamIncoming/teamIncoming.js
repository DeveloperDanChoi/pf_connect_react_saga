import { api } from '../../_call';

/**
 * Team Incoming 삭제 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120347034/DELETE+connect-api+v1+teams+teamId+teamIncoming+connectId
 * @param data
 * @returns
 */
export const deleteV1TeamsTeamIncoming = (data) => api.delete(`/connect-api/v1/teams/${data.teamId}/teamIncoming/${data.connectId}`, {}, { version: 1 });

/**
 * Team Incoming 목록 조회 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120347040/GET+connect-api+v1+teams+teamId+teamIncoming
 * @returns
 */
export const getV1TeamsTeamIncomingList = (data) => api.get(`/connect-api/v1/teams/${data.teamId}/teamIncoming`, { version: 1 });

/**
 * Team Incoming 단건 조회 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1157269344/GET+connect-api+v1+teams+teamId+teamIncoming+connectId
 * @returns
 */
export const getV1TeamsTeamIncoming = (data) => api.get(`/connect-api/v1/teams/${data.teamId}/teamIncoming/${data.connectId}`, { version: 1 });

/**
 * Team Incoming 생성 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120347032/POST+connect-api+v1+teams+teamId+teamIncoming
 * @returns
 */
export const postV1TeamsTeamIncoming = (data) => api.post(`/connect-api/v1/teams/${data.teamId}/teamIncoming`, data.data, { version: 1 });

/**
 * Team Incoming 설정 변경 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120347038/PUT+connect-api+v1+teams+teamId+teamIncoming+connectId+setting
 * @returns
 */
export const putV1TeamsTeamIncomingSetting = (data) => api.put(`/connect-api/v1/teams/${data.teamId}/teamIncoming/${data.connectId}/setting`, data.data, { version: 1 });

/**
 * Team Incoming 상태 변경 ( 소유자 , 관리자만 가능 )
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120347036/PUT+connect-api+v1+teams+teamId+teamIncoming+connectId+status
 * @returns
 */
export const putV1TeamsTeamIncomingStatus = (data) => api.put(`/connect-api/v1/teams/${data.teamId}/teamIncoming/${data.connectId}/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Team Incoming
 */
export default {};

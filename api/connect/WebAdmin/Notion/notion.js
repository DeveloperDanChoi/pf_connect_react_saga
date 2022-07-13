import { api } from '../../../_call';

/**
 * Notion Connect 설정을 삭제하는 API<br>
 * @param data
 * @returns
 */
export const deleteTeamsNotion = (data) => api.delete(`/connect-api/teams/${data.teamId}/notion?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Notion Connect 설정을 단일 조회하는 API<br>
 * @param data
 * @returns
 */
export const getTeamsNotion = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/notion/${params.connectId}`, { version: 1 });

/**
 * Notion Connect 설정을 생성하는 API<br>
 * @param data
 * @returns
 */
export const postTeamsNotion = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/notion`, body, { version: 1 });

/**
 * Notion Connect 설정을 수정하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsNotionSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/notion/setting`, body, { version: 1 });

/**
 * Notion Connect 설정을 활성/비활성하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsNotionStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/notion/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Notion
 */
export default {};

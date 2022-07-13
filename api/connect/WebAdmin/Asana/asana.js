import { api } from '../../../_call';

/**
 * Asana Connect 설정을 삭제하는 API<br>
 * @param data
 * @returns
 */
export const deleteTeamsAsana = (data) => api.delete(`/connect-api/teams/${data.teamId}/asana?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Asana Connect 설정을 단일 조회하는 API<br>
 * @param data
 * @returns
 */
export const getTeamsAsana = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/asana/${params.connectId}`, { version: 1 });

/**
 * Asana Connect 설정을 생성하는 API<br>
 * @param data
 * @returns
 */
export const postTeamsAsana = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/asana`, body, { version: 1 });

/**
 * Asana Connect 설정을 수정하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsAsanaSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/asana/setting`, body, { version: 1 });

/**
 * Asana Connect 설정을 활성/비활성하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsAsanaStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/asana/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Asana
 */
export default {};

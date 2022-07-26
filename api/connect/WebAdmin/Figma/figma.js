import { api, upload } from '../../../_call';
import { util } from '../../../../service/util';

/**
 * Figma Connect 설정을 삭제하는 API<br>
 * @param data
 * @returns
 */
export const deleteTeamsFigma = (data) => api.delete(`/connect-api/teams/${data.teamId}/figma?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Figma Connect 설정을 단일 조회하는 API<br>
 * @param data
 * @returns
 */
export const getTeamsFigma = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/figma/${params.connectId}`, { version: 1 });

/**
 * Figma Connect 설정을 생성하는 API<br>
 * @param data
 * @returns
 */
export const postTeamsFigma = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/figma`, body, { version: 1 });

/**
 * Figma Connect 설정을 수정하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsFigmaSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/figma/setting`, body, { version: 1 });

/**
 * Figma Connect 설정을 활성/비활성하는 API<br>
 * @param data
 * @returns
 */
export const putTeamsFigmaStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/figma/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Figma
 */
export default {};

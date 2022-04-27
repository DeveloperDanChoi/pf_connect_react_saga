import { api } from '../../_call';
/**
 * Github Connect 설정 생성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817448/POST+connect-api+teams+teamId+github
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postGithub = (data) => api.post(`/connect-api/teams/${data.teamId}/github`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Github
 */
export default {};

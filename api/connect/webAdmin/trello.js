import { api } from '../../_call';
/**
 * Connect Trello Service 생성
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817408/POST+connect-api+teams+teamId+trello
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postTrello = (data) => api.post(`/connect-api/teams/${data.teamId}/trello`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Trello
 */
export default {};

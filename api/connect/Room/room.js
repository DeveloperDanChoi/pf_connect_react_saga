import { api } from '../../_call';

/**
 * 특정 Room에 연결된 모든 Connect 정보를 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817591/GET+connect-api+teams+teamId+rooms+roomId+connect
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsRoomsConnect = (data) => api.get(`/connect-api/teams/${data.teamId}/rooms/${data.roomId}/connect`, { version: 1 });

/**
 * API List > Connect API > Room
 */
export default {};

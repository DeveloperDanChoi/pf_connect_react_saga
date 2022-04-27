import { api } from '../../_call';
/**
 * 구글 캘린더와 Connect 연동을 하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817255/POST+connect-api+teams+teamId+googleCalendar
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postGoogleCalendar = (data) => api.post(`/connect-api/teams/${data.teamId}/googleCalendar`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Google Calendar
 */
export default {};

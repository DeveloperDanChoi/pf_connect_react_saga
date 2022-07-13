import { api } from '../../../_call';

/**
 * 구글 캘린더 Connect 연동을 해제하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817274/DELETE+connect-api+teams+teamId+googleCalendar<br>
 * @param data
 * @returns
 */
export const deleteTeamsGoogleCalendar = (data) => api.delete(`/connect-api/teams/${data.teamId}/googleCalendar?connectId=${data.connectId}`, {}, { version: 1 });

/**
 * 구글 캘린더 Connect 연동 정보를 반환하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817266/GET+connect-api+teams+teamId+googleCalendar+connectId<br>
 * @param data
 * @returns
 */
export const getTeamsGoogleCalendar = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/googleCalendar/${params.connectId}`, { version: 1 });

/**
 * 구글 캘린더와 Connect 연동을 하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817255/POST+connect-api+teams+teamId+googleCalendar<br>
 * @param data
 * @returns
 */
export const postTeamsGoogleCalendar = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/googleCalendar`, body, { version: 1 });

/**
 * 구글 캘린더 Connect 연동 설정을 변경하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817261/PUT+connect-api+teams+teamId+googleCalendar+setting<br>
 * @param data
 * @returns
 */
export const putTeamsGoogleCalendarSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/googleCalendar/setting`, body, { version: 1 });

/**
 * 구글 캘린더 Connect 연동을 enable/disable하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817263/PUT+connect-api+teams+teamId+googleCalendar+status<br>
 * @param data
 * @returns
 */
export const putTeamsGoogleCalendarStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/googleCalendar/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Google Calendar
 */
export default {};

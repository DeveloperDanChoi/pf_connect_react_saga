import { api } from '../../../_call';

/**
 * Jira Connect 설정을 삭제하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817365/DELETE+connect-api+teams+teamId+jira<br>
 * @param data
 * @returns
 */
export const deleteTeamsJira = (data) => api.delete(`/connect-api/teams/${data.teamId}/jira?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * Jira Connect 설정을 단일 조회하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817367/GET+connect-api+teams+teamId+jira+connectId<br>
 * @param data
 * @returns
 */
export const getTeamsJira = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/jira/${params.connectId}`, { version: 1 });

/**
 * Jira Connect 설정을 생성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817369/POST+connect-api+teams+teamId+jira<br>
 * @param data
 * @returns
 */
export const postTeamsJira = ({ params, body }) => api.post(`/connect-api/teams/${params.teamId}/jira`, body, { version: 1 });

/**
 * Jira Connect 설정을 수정하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817371/PUT+connect-api+teams+teamId+jira+setting<br>
 * @param data
 * @returns
 */
export const putTeamsJiraSetting = ({ params, body }) => api.put(`/connect-api/teams/${params.teamId}/jira/setting`, body, { version: 1 });

/**
 * JIRA Connect 설정을 활성/비활성하는 API<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817373/PUT+connect-api+teams+teamId+jira+status<br>
 * @param data
 * @returns
 */
export const putTeamsJiraStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/jira/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > Jira
 */
export default {};

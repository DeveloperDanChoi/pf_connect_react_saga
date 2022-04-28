import { api } from '../../_call';

/**
 * 연동 서비스 인증 삭제
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817483/DELETE+connect-api+authentications+authenticationId
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteAuthentications = (data) => api.delete(`/connect-api/authentications/${data.authenticationId}`, {}, { version: 1 });

/**
 * 멤버에게 연결된 connect 인증을 모두 조회하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817642/GET+connect-api+authentication
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationList = () => api.get('/connect-api/authentication', { version: 1 });

/**
 * github 인증 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817249/GET+connect-api+authentication+github
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationGithub = () => api.get('/connect-api/authentication/github', { version: 1 });

/**
 * 인증된 GitHub 정보와 해당 유저의 repositories 리스트 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817578/GET+connect-api+authentication+github+repos
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationGithubReposList = () => api.get('/connect-api/authentication/github/repos', { version: 1 });

/**
 * 구글 캘린더 인증 정보를 전달받는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113391181/GET+connect-api+authentication+googleCalendar
 * TODO: URL check !!
 * GET /integrations/authentication/googleCalendar
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationGoogleCalendar = () => api.get('/connect-api/authentication/googleCalendar', { version: 1 });

/**
 * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817270/GET+connect-api+authentication+googleCalendar+calendarList
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationGoogleCalendarCalendarList = () => api.get('/connect-api/authentication/googleCalendar/calendarList', { version: 1 });

/**
 * Webhook Trello 인증 등록
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113391242/GET+connect-api+authentication+trello
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationTrello = () => api.get('/connect-api/authentication/trello', { version: 1 });

/**
 * Webhook Trello Board List 조회
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817406/GET+connect-api+authentication+trello+boards
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAuthenticationTrelloBoardsList = () => api.get('/connect-api/authentication/trello/boards', { version: 1 });

/**
 * API List > Connect API > Authentication
 */
export default {};

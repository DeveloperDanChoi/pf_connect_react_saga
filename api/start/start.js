import { api, l10n } from '../_call';
/**
 * Start API: 별도의 윈도로 뜨는 앱들을 위한 Account and Member 데이터<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2256535553/GET+start-api+v4+teams+teamId+me<br>
 * @returns
 */
export const getAccountV4TeamsMe = (data) => api.get(`/start-api/v4/teams/${data}/me`, { version: 4 });
/**
 * Start API: Rooms<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2268364801/GET+start-api+v4+teams+teamId+rooms<br>
 * @returns
 */
export const getAccountV4TeamsRooms = (data) => api.get(`/start-api/v4/teams/${data}/rooms`, { version: 4 });

export const getL10N = (data) => l10n.get(`/translation/json/web_client/${data}`, { version: 1 });

/**
 * API List > Start API
 */
export default {};

import { api, upload } from '../../../_call';
import { util } from '../../../../service/util';

/**
 * RSS Connect 설정을 삭제<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913404/DELETE+connect-api+teams+teamId+rss<br>
 * @param data
 * @returns
 */
export const deleteTeamsRss = (data) => api.delete(`/connect-api/teams/${data.teamId}/rss?connectId=${data.connectId}`, data.data, { version: 1 });

/**
 * RSS Connect 설정 단일 조회<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913402/GET+connect-api+teams+teamId+rss+connectId<br>
 * @param data
 * @returns
 */
export const getTeamsRss = ({ params }) => api.get(`/connect-api/teams/${params.teamId}/rss/${params.connectId}`, { version: 1 });

/**
 * RSS Connect 설정 생성<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913356/POST+connect-api+teams+teamId+rss<br>
 * @param data
 * @returns
 */
export const postTeamsRss = ({ params, body }) => upload.post(`/connect-api/teams/${params.teamId}/rss`, util.convertFormData(body), { version: 1 });

/**
 * RSS Connect 설정 수정<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913393/PUT+connect-api+teams+teamId+rss+setting<br>
 * @param data
 * @returns
 */
export const putTeamsRssSetting = ({ params, body }) => upload.put(`/connect-api/teams/${params.teamId}/rss/setting`, util.convertFormData(body), { version: 1 });

/**
 * RSS Connect 활성/비활성<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1117913398/PUT+connect-api+teams+teamId+rss+status<br>
 * @param data
 * @returns
 */
export const putTeamsRssStatus = (data) => api.put(`/connect-api/teams/${data.teamId}/rss/status`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin > RSS
 */
export default {};

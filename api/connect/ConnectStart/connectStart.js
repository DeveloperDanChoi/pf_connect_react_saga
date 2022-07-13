import { api } from '../../_call';

/**
 * Start data for connect<br>
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/2256372330/GET+connect-api+v1+teams+teamId+start<br>
 * @returns
 */
export const getV1TeamsStart = (data) => api.get(`/connect-api/v1/teams/${data}/start`, { version: 1 });

/**
 * API List > Connect API > Connect/Start
 */
export default {};

import { api } from '../_call';
/**
 * 계정에 관련된 Team 의 Chat, Topic 정보를 일괄 가져온다.
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1116308708/v2+GET+start-api+account
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getStartAccountV2 = () => api.get('/start-api/account', { version: 2 });

/**
 * API List > Start API
 */
export default {};

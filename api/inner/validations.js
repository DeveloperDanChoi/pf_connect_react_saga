import { api } from '../_call';
/**
 * 팀의 유효성 확인
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1110051041/v2+GET+validation+team
 * @param data
 * @returns
 */
export const getTeamV2 = (data) => api.get(`/inner-api/validation/team?domain=${data}`, { version: 2 });

/**
 * API List > Inner API > Validations
 */
export default {};

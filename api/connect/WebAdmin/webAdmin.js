import { api } from '../../_call';
import {
  deleteTeamsBitbucket,
  getTeamsBitbucket,
  postTeamsBitbucket,
  putTeamsBitbucketSetting,
  putTeamsBitbucketStatus,
} from './Bitbucket/bitbucket';
import {
  deleteTeamsGithub,
  getTeamsGithub,
  postTeamsGithub,
  putTeamsGithubSetting,
  putTeamsGithubStatus,
} from './Github/github';
import {
  deleteTeamsGoogleCalendar,
  getTeamsGoogleCalendar,
  postTeamsGoogleCalendar,
  putTeamsGoogleCalendarSetting,
  putTeamsGoogleCalendarStatus,
} from './GoogleCalendar/googleCalendar';
import {
  deleteTeamsIncoming,
  getTeamsIncoming,
  postTeamsIncoming,
  putTeamsIncomingSetting,
  putTeamsIncomingStatus,
} from './Incoming/incoming';
import {
  deleteTeamsJira,
  getTeamsJira,
  postTeamsJira,
  putTeamsJiraSetting,
  putTeamsJiraStatus,
} from './Jira/jira';
import {
  deleteTeamsOutgoing,
  getTeamsOutgoing,
  postTeamsOutgoing,
  putTeamsOutgoingSetting,
  putTeamsOutgoingStatus,
} from './Outgoing/outgoing';
import {
  deleteTeamsRss,
  getTeamsRss,
  postTeamsRss,
  putTeamsRssSetting,
  putTeamsRssStatus,
} from './RSS/rss';
import {
  deleteTeamsTrello,
  getTeamsTrello,
  postTeamsTrello,
  putTeamsTrelloSetting,
  putTeamsTrelloStatus,
} from './Trello/trello';

export const webAdmin = (() => ({
  bitbucket: {
    deleteTeams: deleteTeamsBitbucket,
    getTeams: getTeamsBitbucket,
    postTeams: postTeamsBitbucket,
    putTeamsSetting: putTeamsBitbucketSetting,
    putTeamsStatus: putTeamsBitbucketStatus,
  },
  github: {
    deleteTeams: deleteTeamsGithub,
    getTeams: getTeamsGithub,
    postTeams: postTeamsGithub,
    putTeamsSetting: putTeamsGithubSetting,
    putTeamsStatus: putTeamsGithubStatus,
  },
  googleCalendar: {
    deleteTeams: deleteTeamsGoogleCalendar,
    getTeams: getTeamsGoogleCalendar,
    postTeams: postTeamsGoogleCalendar,
    putTeamsSetting: putTeamsGoogleCalendarSetting,
    putTeamsStatus: putTeamsGoogleCalendarStatus,
  },
  incoming: {
    deleteTeams: deleteTeamsIncoming,
    getTeams: getTeamsIncoming,
    postTeams: postTeamsIncoming,
    putTeamsSetting: putTeamsIncomingSetting,
    putTeamsStatus: putTeamsIncomingStatus,
  },
  jira: {
    deleteTeams: deleteTeamsJira,
    getTeams: getTeamsJira,
    postTeams: postTeamsJira,
    putTeamsSetting: putTeamsJiraSetting,
    putTeamsStatus: putTeamsJiraStatus,
  },
  outgoing: {
    deleteTeams: deleteTeamsOutgoing,
    getTeams: getTeamsOutgoing,
    postTeams: postTeamsOutgoing,
    putTeamsSetting: putTeamsOutgoingSetting,
    putTeamsStatus: putTeamsOutgoingStatus,
  },
  rss: {
    deleteTeams: deleteTeamsRss,
    getTeams: getTeamsRss,
    postTeams: postTeamsRss,
    putTeamsSetting: putTeamsRssSetting,
    putTeamsStatus: putTeamsRssStatus,
  },
  trello: {
    deleteTeams: deleteTeamsTrello,
    getTeams: getTeamsTrello,
    postTeams: postTeamsTrello,
    putTeamsSetting: putTeamsTrelloSetting,
    putTeamsStatus: putTeamsTrelloStatus,
  },
}))();

/**
 * 외부에서 Connect에 값을 넘기기 위한 Webhook API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817387/POST+connect-api+webhook+teamId+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const postWebhook = (data) => api.post(`/connect-api/webhook/${data.teamId}/${data.token}`, data.data, { version: 1 });

/**
 * Connect 공통 정보를 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817654/GET+connect-api+connect
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getConnect = () => api.get('/connect-api/connect', { version: 1 });

/**
 * 팀에 연결된 모든 Connect 정보를 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817586/GET+connect-api+teams+teamId+connect
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsConnect = (data) => api.get(`/connect-api/teams/${data}/connect`, { version: 1 });

/**
 * Webhook용 Token을 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1113817375/GET+connect-api+teams+teamId+connectType+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTeamsToken = (data) => api.get(`/connect-api/teams/${data.teamId}/${data.connectType}/token`, { version: 1 });

/**
 * Webhook용 Token을 요청하는 API
 * https://tosslab.atlassian.net/wiki/spaces/API/pages/1120344377/PUT+connect-api+teams+teamId+connectType+token
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putTeamsToken = (data) => api.put(`/connect-api/teams/${data.teamId}/${data.connectType}/token`, data.data, { version: 1 });

/**
 * API List > Connect API > Web admin
 */
export default {};

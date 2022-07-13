import {
  all, fork, takeLatest,
} from 'redux-saga/effects';

import authorizeSaga from './authority/authoritySaga';
import connectSaga, { saga as connectActions } from './connect/connectSaga';
import { modules as connectModules } from './connect/connect';
import asanaSaga, { saga as asanaActions } from './connect/asana/asanaSaga';
import { modules as asanaModules } from './connect/asana/asana';
import bitbucketSaga, { saga as bitbucketActions } from './connect/bitbucket/bitbucketSaga';
import { modules as bitbucketModules } from './connect/bitbucket/bitbucket';
import figmaSaga, { saga as figmaActions } from './connect/figma/figmaSaga';
import { modules as figmaModules } from './connect/figma/figma';
import githubSaga, { saga as githubActions } from './connect/github/githubSaga';
import { modules as githubModules } from './connect/github/github';
import googleCalendarSaga, { saga as googleCalendarActions } from './connect/googleCalendar/googleCalendarSaga';
import { modules as googleCalendarModules } from './connect/googleCalendar/googleCalendar';
import incomingSaga, { saga as incomingActions } from './connect/incoming/incomingSaga';
import { modules as incomingModules } from './connect/incoming/incoming';
import jiraSaga, { saga as jiraActions } from './connect/jira/jiraSaga';
import { modules as jiraModules } from './connect/jira/jira';
import notionSaga, { saga as notionActions } from './connect/notion/notionSaga';
import { modules as notionModules } from './connect/notion/notion';
import outgoingSaga, { saga as outgoingActions } from './connect/outgoing/outgoingSaga';
import { modules as outgoingModules } from './connect/outgoing/outgoing';
import rssSaga, { saga as rssActions } from './connect/rss/rssSaga';
import { modules as rssModules } from './connect/rss/rss';
import trelloSaga, { saga as trelloActions } from './connect/trello/trelloSaga';
import { modules as trelloModules } from './connect/trello/trello';
import teamSaga, { saga as teamActions } from './team/teamSaga';
import { modules as teamModules } from './team/team';
import userSaga from './user/userSaga';
import modalSaga from './modal/modalSaga';
import themeSaga from './theme/themeSaga';
import { config } from '../lib/config';
import { util } from '../service/util';

// eslint-disable-next-line require-yield
function* configUrl() {
  if (typeof window !== 'undefined') config.setConfig(window.jandiApp?.dev?.config);
}

function* handler(modules, sagas) {
  for (const type in modules.types) {
    if ({}.hasOwnProperty.call(modules.types, type)) {
      const saga = util.toCamelCase(type);
      if (sagas[saga]) {
        // console.log( modules.types[type] , sagas[saga])
        yield takeLatest(modules.types[type], sagas[saga]);
      }
    }
  }
}

export default function* rootSaga() {
  yield all([
    configUrl(),
    fork(authorizeSaga),
    fork(connectSaga), handler(connectModules, connectActions),

    fork(asanaSaga), handler(asanaModules, asanaActions),
    fork(bitbucketSaga), handler(bitbucketModules, bitbucketActions),
    fork(figmaSaga), handler(figmaModules, figmaActions),
    fork(githubSaga), handler(githubModules, githubActions),
    fork(googleCalendarSaga), handler(googleCalendarModules, googleCalendarActions),
    fork(incomingSaga), handler(incomingModules, incomingActions),
    fork(jiraSaga), handler(jiraModules, jiraActions),
    fork(notionSaga), handler(notionModules, notionActions),
    fork(outgoingSaga), handler(outgoingModules, outgoingActions),
    fork(rssSaga), handler(rssModules, rssActions),
    fork(trelloSaga), handler(trelloModules, trelloActions),

    // fork(commonSaga),
    // fork(userLoginSaga),
    // fork(authSagas),
    // fork(memberManagementSaga),
    // fork(organizationSaga),
    fork(teamSaga), handler(teamModules, teamActions),
    fork(userSaga),
    fork(modalSaga),
    fork(themeSaga),
    // fork(securitySagas),
    // fork(paymentSagas),
    // fork(downloadHistorySagas),
    // fork(socketSaga),
  ]);
}

import {
  all, fork, takeLatest,
} from 'redux-saga/effects';

import authorizeSaga from './authority/authoritySaga';
import connectSaga from './connect/connectSaga';
import bitbucketSaga from './connect/bitbucket/bitbucketSaga';
import githubSaga from './connect/github/githubSaga';
import googleCalendarSaga, { saga as googleCalendarActions } from './connect/googleCalendar/googleCalendarSaga';
import { modules as googleCalendarModules } from './connect/googleCalendar/googleCalendar';
import incomingSaga from './connect/incoming/incomingSaga';
import jiraSaga from './connect/jira/jiraSaga';
import outgoingSaga from './connect/outgoing/outgoingSaga';
import rssSaga from './connect/rss/rssSaga';
import trelloSaga from './connect/trello/trelloSaga';
import teamSaga from './team/teamSaga';
import userSaga from './user/userSaga';
import { config } from '../lib/config';
import { util } from '../service/util';

// eslint-disable-next-line require-yield
function* configUrl() {
  if (typeof window !== 'undefined') config.setConfig(window.jandiApp?.dev?.config);
}

function* handler(modules, sagas) {
  for (const type in modules.types) {
    const saga = util.toCamelCase(type);
    if (sagas[saga]) {
      yield takeLatest(modules.types[type], sagas[saga]);
    }
  }
}

export default function* rootSaga() {
  yield all([
    configUrl(),
    fork(authorizeSaga),
    fork(connectSaga),

    fork(bitbucketSaga),
    fork(githubSaga),
    fork(googleCalendarSaga), handler(googleCalendarModules, googleCalendarActions),
    fork(incomingSaga),
    fork(jiraSaga),
    fork(outgoingSaga),
    fork(rssSaga),
    fork(trelloSaga),

    // fork(commonSaga),
    // fork(userLoginSaga),
    // fork(authSagas),
    // fork(memberManagementSaga),
    // fork(organizationSaga),
    fork(userSaga),
    fork(teamSaga),
    // fork(securitySagas),
    // fork(paymentSagas),
    // fork(downloadHistorySagas),
    // fork(socketSaga),
  ]);
}
